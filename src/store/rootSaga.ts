import { all } from "redux-saga/effects";
import { watchUserAction } from "./user/userSaga";
import { watchSpendingAction } from "./spending/spendingSaga";

export default function* rootSaga() {
  yield all([watchUserAction(), watchSpendingAction()]);
}
