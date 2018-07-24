import {KIRK} from "../Constants";

const defaultState = {
    admins: [KIRK],
    members: [],
};

/**
 * Away Team management reducer. Keeps track of which users are members and admins of the away-team
 */
export default function(state = defaultState, action) {
    if (action.type === "AWAY_TEAM_LIST") {
        // Set the list of members to the contents of the action payload
        return {
            ...state,
            members: action.payload,
        };
    }
    if (action.type === "ADD_USER_TO_AWAY_TEAM") {
        // Add a new user ID to the list of members
        return {
            ...state,
            members: [action.payload, ...state.members],
        };
    }
    if (action.type === "REMOVE_USER_FROM_AWAY_TEAM") {
        // Filter out the user from the list of users in the away team
        return {
            ...state,
            members: state.members.filter((user) => user !== action.payload),
        };
    }
    return state;
}
