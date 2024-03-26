import useAuth from "../../hooks/useAuth";
import { DashboardProps } from "./Dashboard";
import { useSelector } from "react-redux";

const withDashBoardController = (Component: React.FC<DashboardProps>) => {
  return () => {
    const data = useSelector((state: any) => state.spending);
    useAuth();
    return <Component jars={data.jars} information={data.information} />;
  };
};

export default withDashBoardController;
