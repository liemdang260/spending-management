import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, database } from "./config";
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";

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
        console.log(userData.user.providerData);
        const docRef = await addDoc(collection(database, "users"), {
          id: userData.user.uid,
          ...userData.user.providerData[0],
          // first: "Ada",
          // last: "Lovelace",
          // born: 1815,
        });
        // set(ref(database, "users/" + userData.user.uid), {
        //   username: userData.user.email,
        //   email: email,
        // });
      }
      return userData.user.providerData;
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
}
