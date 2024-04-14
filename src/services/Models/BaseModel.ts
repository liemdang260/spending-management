import { BaseObject } from "./model.Interfaces";
import { FireBaseServices } from "../firebase/firebaseServices";
import { ModelName } from "./model.constants";

export class Model<T extends BaseObject> {
  protected _modelName: ModelName;
  constructor(modelName: ModelName) {
    this._modelName = modelName;
  }

  public async createADocument(id: string, value: T) {
    return FireBaseServices.instance.addADocument(this._modelName, id, value);
  }

  public async getADocument(id: string) {
    return FireBaseServices.instance.getADocument<T>(this._modelName, id);
  }
}
