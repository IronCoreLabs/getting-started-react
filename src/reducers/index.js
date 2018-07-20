import {combineReducers} from "redux";

import activeUser from "./ActiveUserReducer";
import awayTeamGroup from "./AwayTeamGroupReducer";
import orders from "./OrdersReducer";

export default combineReducers({
    activeUser,
    awayTeamGroup,
    orders,
});
