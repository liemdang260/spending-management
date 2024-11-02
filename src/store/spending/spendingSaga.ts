import { call, put, select, takeEvery } from "redux-saga/effects";
import { IUser } from "../../services/Models/UserModel";
import { InformationService } from "../../services/services/informationService";
import { JarService } from "../../services/services/jarService";
import { RootState } from "../store";
import { SPENDING_ACTIONS } from "./spendingAction";
import {
  fetchSpendingDataFalure,
  fetchSpendingDataRequest,
  fetchSpendingDataSuccess,
} from "./spendingSlice";

export function* fetchSpendingDatas(): any {
  yield put(fetchSpendingDataRequest());
  try {
    const user: IUser | null = yield select<(state: RootState) => IUser | null>(
      (state: RootState) => state.user.user
    );

    if (user) {
      const userInformation = yield call(
        InformationService.instance.getUserInformation,
        user.id
      );

      const jars = yield call(JarService.instance.getUserJars, user.id);

      yield put(
        fetchSpendingDataSuccess({
          information: userInformation,
          jars: jars,
        })
      );
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
