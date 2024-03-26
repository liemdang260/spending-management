import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router";
import pageRoute from "../route/pageRoute";
import { USER_ACTION } from "../store/user/userAction";

export default function useAuth() {
  const { isLogged, isRequestLogin, isLogging } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isRequestLogin) {
      dispatch({ type: USER_ACTION.InitUserData });
    } else if (
      !isLogging &&
      !isLogged &&
      !location.pathname.includes(pageRoute.loginPage)
    ) {
      navigate(pageRoute.loginPage);
    } else if (!isLogging && isLogged) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogging, isRequestLogin, isLogged]);
  return { isLogged };
}
