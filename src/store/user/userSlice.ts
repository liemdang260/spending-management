import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { USER_ERROR } from "./userError";

export interface UserState {
  isRequestLogin: boolean;
  isLogged: boolean;
  isLogging: boolean;
  loginError?: USER_ERROR | null;
  user?: any;
}

const initialState: UserState = {
  isLogged: false,
  isLogging: false,
  isRequestLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLogging = true;
      state.isRequestLogin = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isLogged = true;
      state.isLogging = false;
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
    signUpSuccess: (state, action: PayloadAction<any>) => {
      state.isLogged = true;
      state.isLogging = false;
      state.user = action;
      state.loginError = null;
    },
    signUpFailure: (state, action: PayloadAction<USER_ERROR>) => {
      state.isLogged = false;
      state.isLogging = false;
      state.user = null;
      state.loginError = action.payload;
    },
    initUserDataRequest: (state) => {
      state.isRequestLogin = true;
      state.isLogging = true;
    },
    initUserDataSuccess: (state, action: PayloadAction<any>) => {
      state.isLogged = true;
      state.isLogging = false;
      state.user = action;
    },
    initUserDataFailure: (state) => {
      state.isLogged = false;
      state.isLogging = false;
      state.user = null;
    },
    logoutSuccess: (state) => {
      state.isLogged = false;
      state.user = null;
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
  logoutSuccess,
  initUserDataRequest,
  initUserDataSuccess,
  initUserDataFailure,
  removeLoginError,
} = userSlice.actions;

export default userSlice.reducer;
