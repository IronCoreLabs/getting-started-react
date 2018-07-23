import * as Api from "../lib/Api";

/**
 * Request the list of users within the away team
 */
export function getAwayTeamIDs(onComplete) {
    return {
        type: "AWAY_TEAM_LIST",
        operation: Api.getAwayTeamIDs,
        onComplete,
    };
}

/**
 * Add a user as a member to the away-team
 */
export function addUserToAwayTeam(user, onComplete) {
    return {
        type: "ADD_USER_TO_AWAY_TEAM",
        payload: user.id,
        operation: Api.addUserToAwayTeam,
        onComplete,
    };
}

/**
 * Remove a user from the away-team
 */
export function removeUserFromAwayTeam(user, onComplete) {
    return {
        type: "REMOVE_USER_FROM_AWAY_TEAM",
        payload: user.id,
        operation: Api.removeUserFromAwayTeam,
        onComplete,
    };
}
