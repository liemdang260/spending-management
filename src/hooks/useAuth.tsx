import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router";
import pageRoute from "../route/pageRoute";
import { USER_ACTION } from "../store/user/userAction";

export default function useAuth(originURL?: string) {
  const { isLogged, isRequestLogin, isLogging, user } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_ACTION.InitUserData });
    }
  }, [user, isLogged]);

  useEffect(() => {
    if (isRequestLogin && !location.pathname.includes(pageRoute.loginPage)) {
      navigate(pageRoute.loginPage);
    }
  }, [isRequestLogin]);

  useEffect(() => {
    if (!isLogged) {
      return;
    }
    navigate(originURL || pageRoute.dashboardPage);
  }, [isLogged]);

  return { isLogged, isLogging };
}
