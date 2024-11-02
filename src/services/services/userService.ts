import { FireBaseServices } from "../firebase/firebaseServices";
import { ModelName } from "../Models/model.constants";
import { IUser } from "../Models/UserModel";
import { BaseService } from "./baseServices";
import { InformationService } from "./informationService";
import { JarService } from "./jarService";

export class UserService extends BaseService<IUser> {
  private static _instance: UserService;

  constructor() {
    super(ModelName.User);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new UserService();
    }

    return this._instance;
  }

  createNewUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser> => {
    try {
      const { user: newUser } =
        await FireBaseServices.instance.createUserWithEmailAndPassword(
          email,
          password
        );

      if (newUser) {
        const timestamp = Date.now();

        const user: IUser = {
          id: newUser.uid,
          name: newUser.providerData[0].displayName || "",
          email: newUser.providerData[0].email || "",
          providerId: newUser.providerData[0].providerId || "",
          providerData: newUser.providerData,
          photoURL: newUser.providerData[0].photoURL || "",
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        const userDocRef = await this.create(newUser.uid, user);
        await InformationService.instance.init(userDocRef.id);
        await JarService.instance.init(userDocRef.id);

        return user;
      }
      throw new Error("User not found");
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = async (): Promise<IUser | null> => {
    try {
      const currentAuthUser = await FireBaseServices.instance.getCurrentUser();

      if (currentAuthUser) {
        return await this.get<IUser>(currentAuthUser.uid);
      }
      throw new Error("User data not found");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  protected getKey(userId: string): string {
    return `${userId}-user`;
  }
}
