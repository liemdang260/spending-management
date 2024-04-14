import { initialData } from "../firebase/constants";
import { FireBaseServices } from "../firebase/firebaseServices";
import { Model } from "./BaseModel";
import { ModelName } from "./model.constants";

export interface Jar {}

export class JarModel extends Model<Jar> {
  private static _instance: JarModel;

  constructor() {
    super(ModelName.Jars);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public async createADocument(id: string) {
    return FireBaseServices.instance.addADocument<Jar>(
      this._modelName,
      id,
      initialData
    );
  }
}
