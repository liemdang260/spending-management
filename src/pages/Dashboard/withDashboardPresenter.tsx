import useAuth from "../../hooks/useAuth";
import { DashboardProps } from "./Dashboard";

export const withDashboardPresenter = (Component: React.FC<DashboardProps>) => {
  return (props: DashboardProps) => {
    useAuth();
    const presenterProps = {};

    return <Component {...props} {...presenterProps} />;
  };
};
