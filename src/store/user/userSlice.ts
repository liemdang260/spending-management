import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USER_ERROR } from "./userError";
import { IUser } from "../../services/Models/UserModel";

export interface UserState {
  isRequestLogin: boolean;
  isLogged: boolean;
  isLogging: boolean;
  loginError?: USER_ERROR | null;
  user: IUser | null;
}

const initialState: UserState = {
  isLogged: false,
  isLogging: false,
  isRequestLogin: false,
  user: null,
  loginError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLogging = true;
      state.isRequestLogin = true;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLogged = true;
      state.isLogging = false;
      state.isRequestLogin = false;
      state.user = action.payload;
      state.loginError = null;
    },
    loginFalure: (state, action: PayloadAction<USER_ERROR>) => {
      state.isLogged = false;
      state.isLogging = false;
      state.user = null;
      state.loginError = action.payload;
    },
    signUpRequest: (state) => {
      state.isLogging = true;
      state.isLogged = false;
    },
    signUpSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLogged = true;
      state.isLogging = false;
      state.user = action.payload;
      state.loginError = null;
    },
    signUpFailure: (state, action: PayloadAction<USER_ERROR>) => {
      state.isLogged = false;
      state.isLogging = false;
      state.user = null;
      state.loginError = action.payload;
    },
    initUserDataRequest: (state) => {
      state.isLogging = true;
    },
    initUserDataSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLogged = true;
      state.isLogging = false;
      state.user = action.payload;
    },
    initUserDataFailure: (state) => {
      state.isLogged = false;
      state.isLogging = false;
      state.isRequestLogin = true;
      state.user = null;
    },
    logoutRequest: (state) => {
      state.isLogging = true;
    },
    logoutSuccess: (state) => {
      state.isLogged = false;
      state.isLogging = false;
      state.user = null;
    },
    logoutFailure: (state, action: PayloadAction<any>) => {
      state.isLogging = false;
      state.isLogged = false;
      state.user = null;
      state.loginError = action.payload;
    },
    removeLoginError: (state) => {
      state.loginError = null;
    },
  },
});

export const {
  loginSuccess,
  loginFalure,
  loginRequest,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  initUserDataRequest,
  initUserDataSuccess,
  initUserDataFailure,
  removeLoginError,
} = userSlice.actions;

export default userSlice.reducer;
