import { BaseModel, IInitData } from "./baseModel";
import { ITransaction } from "./TransactionModel";

export interface IJar extends BaseModel {
  id: string;
  order: number;
  name: string;
  income: number;
  outcome: number;
  percent: number;
  transactions: ITransaction[];
}

export const initialData: IInitData<IJar>[] = [
  {
    order: 0,
    name: "common",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 55,
  },
  {
    order: 1,
    name: "study",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 10,
  },
  {
    order: 2,
    name: "save",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 10,
  },
  {
    order: 3,
    name: "investion",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 10,
  },
  {
    order: 4,
    name: "enjoyment",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 10,
  },
  {
    order: 5,
    name: "charity",
    income: 0,
    outcome: 0,
    transactions: [],
    percent: 5,
  },
];
