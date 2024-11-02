import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import pageRoute from "../route/pageRoute";
import { RootState } from "../store/store";
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
  }, [user, isLogged, dispatch]);

  useEffect(() => {
    if (isRequestLogin && !location.pathname.includes(pageRoute.loginPage)) {
      navigate(pageRoute.loginPage);
    }
  }, [isRequestLogin, dispatch, location.pathname, navigate]);

  useEffect(() => {
    if (!isLogged) {
      return;
    }
    navigate(originURL || pageRoute.dashboardPage);
  }, [isLogged, navigate, originURL]);

  return { isLogged, isLogging };
}
