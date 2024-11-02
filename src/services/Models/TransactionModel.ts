import { BaseModel } from "./baseModel";

export interface ITransaction extends BaseModel {
  source?: string;
  destination?: string;
  description?: string;
  value: number;
  date: Date;
  tag: string;
  name: string;
  id: string;
}
