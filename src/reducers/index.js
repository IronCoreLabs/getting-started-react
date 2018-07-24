import {combineReducers} from "redux";

import activeUser from "./ActiveUserReducer";
import awayTeam from "./AwayTeamReducer";
import orders from "./OrdersReducer";

export default combineReducers({
    activeUser,
    awayTeam,
    orders,
});
