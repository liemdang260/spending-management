import React, { ReactElement } from "react";
import { FireBaseServices } from "../../firebase/firebaseServices";
import { LoginFormProps } from "./LoginForm";
import { useDispatch } from "react-redux";
import { loginSuccess, removeLoginError } from "../../store/user/userSlice";
import { USER_ACTION } from "../../store/user/userAction";

const withLoginController = (Component: React.FC<LoginFormProps>) => {
  return (props: any) => {
    const dispatch = useDispatch();

    const onLogin = async (username: string, password: string) => {
      dispatch({ type: USER_ACTION.UserLogin, data: { username, password } });
    };

    const onRemoveLoginError = () => {
      dispatch(removeLoginError());
    };

    const logisProps = {
      onLogin,
      onRemoveLoginError,
    };

    return <Component {...props} {...logisProps} />;
  };
};

export default withLoginController;
