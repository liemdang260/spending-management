export interface IJar {
  id?: any;
  name: string;
  income: number;
  outcome: number;
  spendingDetail: ISpending[];
  percent: number;
}

export interface ISpending {
  date: Date;
  tag: string;
  name: string;
  value: number;
}
