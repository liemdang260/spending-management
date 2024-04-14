import { FireBaseServices } from "../firebase/firebaseServices";
import { Model } from "./BaseModel";
import { InformationModel } from "./InformationModel";
import { JarModel } from "./JarModel";
import { ModelName } from "./model.constants";

export interface User {
  id?: string;
}

export class UserModel extends Model<User> {
  private static _instance: UserModel;

  constructor() {
    super(ModelName.User);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  createNewUser = async (email: string, password: string): Promise<any> => {
    try {
      const userData =
        await FireBaseServices.instance.createUserWithEmailAndPassword(
          email,
          password
        );

      if (userData) {
        const docRef = await this.createADocument(userData.user.uid, {
          id: userData.user.uid,
          ...userData.user.providerData[0],
        });
        await InformationModel.instance.createADocument(docRef.id);
        await JarModel.instance.createADocument(docRef.id);
        return { ...userData.user.providerData, id: docRef.id };
      }
      throw Error;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getCurrentUser = async () => {
    try {
      const userData = await FireBaseServices.instance.getCurrentUser();

      if (userData) {
        return { ...userData.providerData[0], userId: userData.uid };
      }
      throw Error();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
