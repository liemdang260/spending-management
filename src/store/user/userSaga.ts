import { call, delay, put, takeEvery } from "redux-saga/effects";
import { USER_ACTION } from "./userAction";
import {
  initUserDataFailure,
  initUserDataRequest,
  initUserDataSuccess,
  loginFalure,
  loginRequest,
  loginSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "./userSlice";
import { FireBaseServices } from "../../firebase/firebaseServices";
import FIREBASE_ERROR from "../../firebase/firebaseError";
import { USER_ERROR } from "./userError";

function* createNewUserHandle(action: any): any {
  yield put(signUpRequest());
  try {
    const user = yield call(
      FireBaseServices.instance.createNewUser,
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
  } catch (error: any) {
    console.log(error.code);
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
    const userData = yield call(FireBaseServices.instance.getCurrentUser);
    if (userData) {
      yield put(initUserDataSuccess(userData.providerData));
    } else {
      yield put(initUserDataFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(initUserDataFailure());
  }
}

export function* watchUserAction() {
  yield takeEvery(USER_ACTION.CreateNewUser, createNewUserHandle);
  yield takeEvery(USER_ACTION.UserLogin, loginHandle);
  yield takeEvery(USER_ACTION.InitUserData, initUserDataHandle);
}
