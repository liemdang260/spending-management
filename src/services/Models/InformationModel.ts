import { initialData } from "../firebase/constants";
import { FireBaseServices } from "../firebase/firebaseServices";
import { Model } from "./BaseModel";
import { ModelName } from "./model.constants";

export interface Information {}

export class InformationModel extends Model<Information> {
  private static _instance: InformationModel;

  constructor() {
    super(ModelName.Information);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public createADocument = async (id: string) => {
    return FireBaseServices.instance.addADocument<Information>(
      this._modelName,
      id,
      initialData
    );
  };

  public getUserData = async (userId: string) => {
    console.log(this);
    return this.getADocument(userId);
  };
}
