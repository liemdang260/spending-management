import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { USER_ACTION } from "./userAction";
import {
  initUserDataFailure,
  initUserDataRequest,
  initUserDataSuccess,
  loginFalure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "./userSlice";
import { FireBaseServices } from "../../services/firebase/firebaseServices";
import FIREBASE_ERROR from "../../services/firebase/firebaseError";
import { USER_ERROR } from "./userError";
import { SPENDING_ACTIONS } from "../spending/spendingAction";
import { UserModel } from "../../services/Models/UserModel";

function* createNewUserHandle(action: any): any {
  yield put(signUpRequest());
  try {
    const user = yield call(
      UserModel.instance.createNewUser,
      action.data.username,
      action.data.password
    );
    yield put(signUpSuccess(user));
  } catch (error: any) {
    console.log(error.code);
    switch (error.code) {
      case FIREBASE_ERROR.EmailAlredyInUse:
        yield put(signUpFailure(USER_ERROR.EmailAlredyInUse));
        break;
      default:
        yield put(signUpFailure(USER_ERROR.SomeThingWereWrong));
    }
  }
}

function* loginHandle(action: any): any {
  yield put(loginRequest());
  try {
    const {
      user: { providerData: userData },
    } = yield call(
      FireBaseServices.instance.login,
      action.data.username,
      action.data.password
    );

    yield put(loginSuccess(userData));
    yield put({
      type: SPENDING_ACTIONS.FetchSpendingDatas,
    });
  } catch (error: any) {
    switch (error.code) {
      case FIREBASE_ERROR.UserNotFound:
        yield put(loginFalure(USER_ERROR.UserNotFound));
        break;
      case FIREBASE_ERROR.WrongPassword:
        yield put(loginFalure(USER_ERROR.WrongPassword));
        break;
      default:
        yield put(loginFalure(USER_ERROR.SomeThingWereWrong));
    }
  }
}

function* initUserDataHandle(): any {
  yield put(initUserDataRequest());
  try {
    const userData = yield call(UserModel.instance.getCurrentUser);

    if (userData) {
      yield put(initUserDataSuccess(userData));
      yield put({ type: SPENDING_ACTIONS.FetchSpendingDatas });
    } else {
      yield put(initUserDataFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(initUserDataFailure());
  }
}

function* logoutHandle() {
  yield put(logoutRequest());
  try {
    yield call(FireBaseServices.instance.logout);
    yield call([localStorage, localStorage.removeItem], "access_token");
    yield put(logoutSuccess());
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error));
  }
}

export function* watchUserAction() {
  yield takeEvery(USER_ACTION.CreateNewUser, createNewUserHandle);
  yield takeEvery(USER_ACTION.UserLogin, loginHandle);
  yield takeLatest(USER_ACTION.InitUserData, initUserDataHandle);
  yield takeLatest(USER_ACTION.UserLogout, logoutHandle);
}
