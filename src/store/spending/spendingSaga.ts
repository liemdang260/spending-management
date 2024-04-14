import { call, put, select, takeEvery } from "redux-saga/effects";
import { SPENDING_ACTIONS } from "./spendingAction";
import {
  fetchSpendingDataFalure,
  fetchSpendingDataRequest,
  fetchSpendingDataSuccess,
} from "./spendingSlice";
import { RootState } from "../store";
import { UserState } from "../user/userSlice";
import { InformationModel } from "../../services/Models/InformationModel";

export function* fetchSpendingDatas(): any {
  yield put(fetchSpendingDataRequest());
  try {
    const user = yield select<(state: RootState) => UserState>(
      (state: RootState) => state.user.user
    );
    if (user) {
      const userData = yield call(
        InformationModel.instance.getUserData,
        user.userId
      );
      yield put(fetchSpendingDataSuccess(userData));
      return;
    }
    throw Error;
  } catch (error) {
    console.log(error);
    yield put(fetchSpendingDataFalure("failed"));
  }
}

export function* watchSpendingAction() {
  yield takeEvery(SPENDING_ACTIONS.FetchSpendingDatas, fetchSpendingDatas);
}
