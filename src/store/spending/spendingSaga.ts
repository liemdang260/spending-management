import { put, takeEvery } from "redux-saga/effects";
import { SPENDING_ACTIONS } from "./spendingAction";
import {
  fetchSpendingDataFalure,
  fetchSpendingDataRequest,
  fetchSpendingDataSuccess,
} from "./spendingSlice";

export function* fetchSpendingDatas() {
  yield put(fetchSpendingDataRequest());

  try {
    yield put(fetchSpendingDataSuccess());
  } catch (error) {
    yield put(fetchSpendingDataFalure());
  }
}

export function* watchIncrementAsync() {
  yield takeEvery(SPENDING_ACTIONS.FetchSpendingDatas, fetchSpendingDatas);
}
