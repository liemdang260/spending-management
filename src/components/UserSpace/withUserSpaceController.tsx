import React from "react";
import { UserSpaceProps } from "./UserSpace";
import { useDispatch } from "react-redux";
import { USER_ACTION } from "../../store/user/userAction";

const withUserSpaceController = (Component: React.FC<UserSpaceProps>) => {
  return (props: any) => {
    const dispatch = useDispatch();
    const onLogout = async () => {
      try {
        dispatch({ type: USER_ACTION.UserLogout });
      } catch (error) {
        console.log(error);
      }
    };
    const logisProps = {
      onLogout,
    };
    return <Component {...props} {...logisProps} />;
  };
};

export default withUserSpaceController;
