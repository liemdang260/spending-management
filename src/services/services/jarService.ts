import { IJar, initialData } from "../Models/JarModel";
import { ModelName } from "../Models/model.constants";
import { BaseService } from "./baseServices";
import { getCurrentMonth, getCurrentYear } from "../../utils/date";
import { v4 as uuidv4 } from "uuid";

export class JarService extends BaseService<IJar> {
  private static _instance: JarService;

  constructor() {
    super(ModelName.Jars);
  }

  public static get instance(): JarService {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public init = async (userId: string) => {
    const createdAt = Date.now();

    await Promise.all([
      initialData.map(async (jar) => {
        return await this.create(this.getKey(userId), {
          ...jar,
          id: this.getKey(userId),
          createdAt: createdAt,
          updatedAt: createdAt,
        });
      }),
    ]);
  };

  public getUserJars = async (userId: string): Promise<IJar[]> => {
    return await this.getByPrefix(userId);
  };

  protected getKey = (userId: string): string => {
    return `${userId}-jar-${uuidv4()}-${getCurrentYear()}-${getCurrentMonth()}`;
  };
}
