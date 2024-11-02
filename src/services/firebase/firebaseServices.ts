import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";
import { auth, database } from "./config";
import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { ModelName } from "../Models/model.constants";

type FireBaseQuery = {
  startAt?: any;
  endAt?: any;
};

export class FireBaseServices {
  private static serviceInstance: FireBaseServices;

  static get instance(): FireBaseServices {
    if (!this.serviceInstance) {
      this.serviceInstance = new FireBaseServices();
    }
    return this.serviceInstance;
  }

  addADocument = async <T extends {} = {}>(
    modelName: ModelName,
    id: string,
    value: T
  ): Promise<any> => {
    const newDocRef = doc(database, modelName, id);
    await setDoc(newDocRef, value);
    return { id: newDocRef.id, ...value };
  };

  getADocument = async <T extends any = {}>(
    modelName: ModelName,
    id: string
  ): Promise<T> => {
    const docSnap = await getDoc(doc(database, modelName, id));

    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    throw Error();
  };

  getDocuments = async <T extends any = {}>(
    modelName: ModelName,
    query?: FireBaseQuery
  ): Promise<T[]> => {
    const collectionRef = collection(database, modelName);
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents as T[];
  };

  createUserWithEmailAndPassword = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  login = async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  logout = async () => {
    await signOut(auth);
  };

  getCurrentUser = (): Promise<User | null> => {
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
