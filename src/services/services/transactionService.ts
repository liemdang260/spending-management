// src/services/services/transactionService.ts
import { BaseService } from "./baseServices";
import { ModelName } from "../Models/model.constants";
import { ITransaction } from "../Models/TransactionModel";
import { getCurrentMonth, getCurrentYear } from "../../utils/date";

export class TransactionService extends BaseService<ITransaction> {
  constructor() {
    super(ModelName.Transactions);
  }

  protected getKey(userId: string): string {
    return `${userId}-transaction-${getCurrentYear()}-${getCurrentMonth()}`;
  }
}
