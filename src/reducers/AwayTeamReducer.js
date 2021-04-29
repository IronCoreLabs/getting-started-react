const defaultState = {
    id: null,
    admins: [],
    members: [],
};

/**
 * Away Team management reducer. Keeps track of which users are members and admins of the away-team
 */
const reducer = (state = defaultState, action) => {
    if (action.type === "SET_AWAY_TEAM") {
        //Set initial details about the away team
        return {
            id: action.payload.groupID,
            admins: action.payload.groupAdmins,
            members: action.payload.groupMembers,
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

export default reducer;
