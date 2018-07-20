import {css} from "emotion";

const ORDER_STORAGE_KEY = "ironcore-orders";
const GROUP_MEMBER_STORAGE_KEY = "ironcore-away-team";

/**
 * Generic method for adding a new item to a local storage array by the provided key
 */
function addItemToLocalStorageArray(key, item) {
    const lsJSON = localStorage.getItem(key);
    if (!lsJSON) {
        return localStorage.setItem(key, JSON.stringify([item]));
    }
    try {
        const items = JSON.parse(lsJSON);
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        //If JSON parsing the orders fails, just set the current one as the only item
        localStorage.setItem(key, JSON.stringify([item]));
    }
}

/**
 * Convert an object with style keys to CSS rules into an object of emotion classes with the same keys
 */
export function stylesListToClassNames(styles) {
    return Object.keys(styles).reduce((classNames, styleKey) => {
        classNames[styleKey] = css(styles[styleKey]);
        return classNames;
    }, {});
}

/**
 * Get list of orders from local storage
 */
export function getOrders() {
    try {
        const orders = localStorage.getItem(ORDER_STORAGE_KEY);
        if (orders) {
            return JSON.parse(orders);
        }
    } catch (e) {}
    return [];
}

/**
 * Add order to list of orders in local storage
 */
export function addOrderToStorage(order) {
    addItemToLocalStorageArray(ORDER_STORAGE_KEY, order);
}

/**
 * Add provided user ID to list of users in away team group in local storage
 */
export function addUserToAwayTeam(userID) {
    addItemToLocalStorageArray(GROUP_MEMBER_STORAGE_KEY, userID);
}

/**
 * Get list of orders from local storage
 */
export function getAwayTeamIDs() {
    try {
        const userIDs = localStorage.getItem(GROUP_MEMBER_STORAGE_KEY);
        if (userIDs) {
            return JSON.parse(userIDs);
        }
    } catch (e) {}
    return [];
}

/**
 * Remove provided user ID from list of users in away team group in local storage
 */
export function removeUserFromAwayTeam(userID) {
    const awayTeamJSON = localStorage.getItem(GROUP_MEMBER_STORAGE_KEY);
    if (!awayTeamJSON) {
        return;
    }
    try {
        const users = JSON.parse(awayTeamJSON);
        localStorage.setItem(GROUP_MEMBER_STORAGE_KEY, JSON.stringify(users.filter((user) => user !== userID)));
    } catch (e) {
        //If JSON parsing the user list fails, just clear the entire key
        localStorage.removeItem(GROUP_MEMBER_STORAGE_KEY);
    }
}
