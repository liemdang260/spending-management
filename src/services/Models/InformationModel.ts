import { getCurrentMonth, getCurrentYear } from "../../utils/date";
import { BaseModel, IInitData } from "./baseModel";

export interface IInformation extends BaseModel {
  income: number;
  outcome: number;
  balance: number;
  lastUpdate: number;
  month: string;
  year: string;
  id: string;
}

export const initialData: IInitData<IInformation> = {
  income: 0,
  outcome: 0,
  balance: 0,
  lastUpdate: Date.now(),
  month: getCurrentMonth().toString(),
  year: getCurrentYear().toString(),
};
