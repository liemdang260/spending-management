import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { RootState } from "../../store/store";
import { DashboardPresenterProps } from "./withDashboardPresenter";

const withDashBoardController = <T extends DashboardPresenterProps>(
  Component: React.FC<T>
) => {
  return (props: Omit<T, keyof DashboardPresenterProps>) => {
    const { isLogged } = useAuth();
    const data = useSelector((state: RootState) => state.spending.data);

    const isFetching = useSelector(
      (state: RootState) => state.spending.isFetching
    );

    return (
      <Component
        {...(props as T)}
        jars={data.jars}
        information={data.information!}
        isLoading={isFetching || !isLogged}
      />
    );
  };
};

export default withDashBoardController;
