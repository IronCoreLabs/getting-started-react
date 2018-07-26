import * as IronWeb from "@ironcorelabs/ironweb";
import showSnackbar from "../lib/Snackbar";

/**
 * Store details about the away team
 */
export function setAwayTeam(awayTeam) {
    return {
        type: "SET_AWAY_TEAM",
        payload: awayTeam,
    };
}

/**
 * Add a user as a member to the away-team
 */
export function addUserToAwayTeam(user, onSuccess, onFail) {
    return (dispatch, getState) => {
        IronWeb.group
            .addMembers(getState().awayTeam.id, [user.id])
            .then((addResult) => {
                if (addResult.succeeded.length) {
                    dispatch({type: "ADD_USER_TO_AWAY_TEAM", payload: user.id});
                    onSuccess();
                } else {
                    onFail();
                    showSnackbar(addResult.failed[0].errorMessage, "error");
                }
            })
            .catch((e) => {
                onFail();
                showSnackbar(e.message, "error");
            });
    };
}

/**
 * Remove a user from the away-team
 */
export function removeUserFromAwayTeam(user, onSuccess, onFail) {
    return (dispatch, getState) => {
        IronWeb.group
            .removeMembers(getState().awayTeam.id, [user.id])
            .then((removeResult) => {
                if (removeResult.succeeded.length) {
                    dispatch({type: "REMOVE_USER_FROM_AWAY_TEAM", payload: user.id});
                    onSuccess();
                } else {
                    onFail();
                    showSnackbar(removeResult.failed[0].errorMessage, "error");
                }
            })
            .catch((e) => {
                onFail();
                showSnackbar(e.message, "error");
            });
    };
}
