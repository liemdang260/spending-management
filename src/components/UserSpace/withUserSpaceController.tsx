import React from "react";
import { FireBaseServices } from "../../services/firebase/firebaseServices";
import { UserSpaceProps } from "./UserSpace";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/user/userSlice";

const withUserSpaceController = (Component: React.FC<UserSpaceProps>) => {
  return (props: any) => {
    const dispatch = useDispatch();
    const onLogout = async () => {
      try {
        await FireBaseServices.instance.logout();
        localStorage.removeItem("access_token");
        dispatch(logoutSuccess());
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
