import * as IronWeb from "@ironcorelabs/ironweb";
import {getTestGroup, setTestGroup} from "./Utils";

/**
 * Request a signed JWT from the server for the current project and segment.
 */
function getJWT(userID) {
    return fetch(`http://localhost:3001/generateJWT?userID=${userID}`)
        .then((response) => response.text())
        .catch((e) => console.log(e));
}

/**
 * Mocked out method to get a users passcode. Fixed for now for PoC purposes.
 */
function getUserPasscode() {
    return Promise.resolve("SAMPLE_PASSCODE");
}

/**
 * Get test group to operate within for demo. Either retrieves an existing group if the ID is set
 * in local storage. Otherwise will create a new group. Either way will resolve with details
 * about the group.
 */
export function getTestGroupDetails() {
    const existingTestGroup = getTestGroup();
    if (!existingTestGroup) {
        return IronWeb.group.create().then((group) => {
            setTestGroup(group.groupID);
            return group;
        });
    }
    return IronWeb.group.get(existingTestGroup);
}

/**
 * Initialize the IronWeb SDK as the provided user ID
 */
export function initializeAsUser(userID) {
    return IronWeb.initialize(() => getJWT(userID), () => getUserPasscode());
}
