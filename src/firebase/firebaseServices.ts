import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, database } from "./config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { INIT_JARS_DATA, initialData } from "./constants";

export class FireBaseServices {
  private static serviceInstance: FireBaseServices;

  static get instance(): FireBaseServices {
    if (!this.serviceInstance) {
      this.serviceInstance = new FireBaseServices();
    }
    return this.serviceInstance;
  }

  createNewUser = async (email: string, password: string): Promise<any> => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userData) {
        const docRef = await addDoc(collection(database, "users"), {
          id: userData.user.uid,
          ...userData.user.providerData[0],
        });
        await this.initData(docRef.id);
        return { ...userData.user.providerData, id: docRef.id };
      }
      throw Error;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  login = async (email: string, password: string): Promise<any> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  logout = async () => {
    await signOut(auth);
  };

  getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  private initData = async (userId: string): Promise<any> => {
    await addDoc(collection(database, "data"), {
      ...initialData,
      userId,
    });
    await setDoc(doc(database, "jars", userId), {});
    await Promise.all(
      INIT_JARS_DATA.map((jar) =>
        addDoc(collection(database, "jars", userId), jar)
      )
    );
  };
}
