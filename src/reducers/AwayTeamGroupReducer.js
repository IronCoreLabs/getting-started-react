import {KIRK} from "../Constants";
import * as Utils from "../lib/Utils";

const defaultState = {
    admins: [KIRK],
    //Load list of members from local storage
    members: Utils.getAwayTeamIDs(),
};

/**
 * Group management reducer. Keeps track of which users are members and admins of the away-team group
 */
export default function(state = defaultState, action) {
    if (action.type === "ADD_USER_TO_GROUP") {
        return {
            ...state,
            members: [action.payload, ...state.members],
        };
    }
    if (action.type === "REMOVE_USER_FROM_GROUP") {
        return {
            ...state,
            members: state.members.filter((user) => user !== action.payload),
        };
    }
    return state;
}
