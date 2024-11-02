import { FireBaseServices } from "../firebase/firebaseServices";
import { BaseModel } from "../Models/baseModel";
import { ModelName } from "../Models/model.constants";

export interface IBaseService<T extends BaseModel> {
  create: (id: string, value: T) => Promise<T>;
  get<T>(id: string): Promise<T>;
}

export abstract class BaseService<T extends BaseModel>
  implements IBaseService<T>
{
  protected _modelName: ModelName;

  constructor(modelName: ModelName) {
    this._modelName = modelName;
  }

  protected abstract getKey(userId: string): string;

  public async create(id: string, value: T) {
    return FireBaseServices.instance.addADocument(this._modelName, id, value);
  }

  public async get<T>(id: string): Promise<T> {
    return FireBaseServices.instance.getADocument<T>(this._modelName, id);
  }

  public async getByPrefix<T>(prefix: string): Promise<T[]> {
    return FireBaseServices.instance.getDocuments<T>(this._modelName, {
      startAt: prefix,
    });
  }
}
