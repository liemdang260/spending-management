import Dashboard from "./Dashboard";
import withDashBoardController from "./withDashboardController";
import { withDashboardPresenter } from "./withDashboardPresenter";

export default withDashBoardController(withDashboardPresenter(Dashboard));
