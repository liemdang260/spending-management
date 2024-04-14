import useAuth from "../../hooks/useAuth";
import { RootState } from "../../store/store";
import { DashboardProps } from "./Dashboard";
import { useSelector } from "react-redux";

const withDashBoardController = (Component: React.FC<DashboardProps>) => {
  return () => {
    useAuth();
    const data = useSelector((state: RootState) => state.spending.data);

    return <Component jars={data.jars} information={data.information} />;
  };
};

export default withDashBoardController;
