import {initializeAsUser} from "../lib/Initialization";

/**
 * Change the current active user to simulate logging in as a different user
 */
export function changeActiveUser(user, onSuccess) {
    return (dispatch) => {
        initializeAsUser(user.id).then(() => {
            dispatch({
                type: "SWITCH_USER",
                payload: user,
            });
            onSuccess();
        });
    };
}
