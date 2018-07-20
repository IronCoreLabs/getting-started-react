import * as Utils from "../lib/Utils";

/**
 * Add a user as a member to the away-team group
 */
export function addMemberToAwayTeamGroup(user) {
    Utils.addUserToAwayTeam(user.id);
    return {
        type: "ADD_USER_TO_GROUP",
        payload: user.id,
    };
}

/**
 * Remove a user from the away-team group member list
 */
export function removeMemberFromAwayTeamGroup(user) {
    Utils.removeUserFromAwayTeam(user.id);
    return {
        type: "REMOVE_USER_FROM_GROUP",
        payload: user.id,
    };
}
