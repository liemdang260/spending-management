import React from "react";
import { SignUpFormProps } from "./SignUpForm";
import { useDispatch } from "react-redux";
import { USER_ACTION } from "../../store/user/userAction";
import { removeLoginError } from "../../store/user/userSlice";

const withSignUpController = (Component: React.FC<SignUpFormProps>) => {
  return (props: any) => {
    const dispatch = useDispatch();
    const onSignUp = (username: string, password: string) => {
      dispatch({
        type: USER_ACTION.CreateNewUser,
        data: { username, password },
      });
    };
    const onRemoveLoginError = () => {
      dispatch(removeLoginError());
    };
    const logisProps = {
      onSignUp,
      onRemoveLoginError,
    };
    return <Component {...props} {...logisProps} />;
  };
};

export default withSignUpController;
