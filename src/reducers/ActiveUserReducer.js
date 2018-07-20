import {Users, KIRK} from "../Constants";

const defaultState = Users[KIRK];

/**
 * User switch state reducer. Keeps track of who the currently "active" user is for the app
 */
export default function(state = defaultState, action) {
    if (action.type === "SWITCH_USER") {
        return action.payload;
    }
    return state;
}
