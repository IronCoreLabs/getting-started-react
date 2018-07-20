/**
 * Change the current active user to simulate logging in as a different user
 */
export function changeActiveUser(user) {
    return {
        type: "SWITCH_USER",
        payload: user,
    };
}
