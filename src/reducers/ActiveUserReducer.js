import {Users, KIRK} from "../Constants";

const defaultState = Users[KIRK];

/**
 * User switch state reducer. Keeps track of who the currently "active" user is for the app
 */
const reducer = (state = defaultState, action) => {
    if (action.type === "SWITCH_USER") {
        return action.payload;
    }
    return state;
}

export default reducer;
