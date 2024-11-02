import { BaseService } from "./baseServices";
import { IInformation, initialData } from "../Models/InformationModel";
import { ModelName } from "../Models/model.constants";
import { getCurrentMonth, getCurrentYear } from "../../utils/date";

export interface IInformationService extends BaseService<IInformation> {}
export class InformationService
  extends BaseService<IInformation>
  implements IInformationService
{
  private static _instance: InformationService;

  constructor() {
    super(ModelName.Information);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public init = async (userId: string) => {
    const createdAt = Date.now();
    return this.create(this.getKey(userId), {
      ...initialData,
      id: this.getKey(userId),
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  };

  public getUserInformation = async (userId: string): Promise<IInformation> => {
    return await this.get(this.getKey(userId));
  };

  public getKey = (userId: string): string => {
    return `${userId}-information-${getCurrentYear()}-${getCurrentMonth()}`;
  };
}
