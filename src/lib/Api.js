/**
 * This file represents a mocked API request library. It's meant to behave as a wrapper around
 * an APIs requests to a backend server for storage and retrieval. Methods are asynchronous to
 * act as if an actual Ajax request is taking place, even though we're just using local storage
 * for simplification.
 */

const ORDER_STORAGE_KEY = "ironcore-orders";
const AWAY_TEAM_MEMBER_STORAGE_KEY = "ironcore-away-team";

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
 * Get a list of orders from local storage, without the actual order data
 */
export function listOrders() {
    return new Promise((resolve) => {
        try {
            const orders = localStorage.getItem(ORDER_STORAGE_KEY);
            if (!orders) {
                //No orders yet, just resolve with an empty array
                return resolve([]);
            }
            //Resolve the promise with the list of orders with just the ID and date created
            resolve(JSON.parse(orders).map(({id, created}) => ({id, created})));
        } catch (e) {
            resolve([]);
        }
    });
}

/**
 * Get a specific order from local storage
 */
export function getOrder(orderID) {
    return new Promise((resolve, reject) => {
        try {
            const orders = localStorage.getItem(ORDER_STORAGE_KEY);
            if (!orders) {
                return reject(new Error("Order does not exist!"));
            }
            JSON.parse(orders).forEach((order) => {
                if (order.id === orderID) {
                    resolve(order);
                }
            });
        } catch (e) {
            reject(new Error("Order does not exist!"));
        }
    });
}

/**
 * Add order to list of orders in local storage
 */
export function createOrder(orderText) {
    return new Promise((resolve) => {
        const newOrder = {
            id: Math.random()
                .toString(36)
                .slice(2),
            data: orderText,
            created: Date.now(),
        };
        addItemToLocalStorageArray(ORDER_STORAGE_KEY, newOrder, resolve);
        resolve(newOrder);
    });
}

/**
 * Get list of orders from local storage
 */
export function getAwayTeamIDs() {
    return new Promise((resolve) => {
        try {
            const userIDs = localStorage.getItem(AWAY_TEAM_MEMBER_STORAGE_KEY);
            if (userIDs) {
                return resolve(JSON.parse(userIDs));
            }
            resolve([]);
        } catch (e) {
            resolve([]);
        }
    });
}

/**
 * Add provided user ID to list of users in away team in local storage
 */
export function addUserToAwayTeam(userID) {
    return new Promise((resolve) => {
        addItemToLocalStorageArray(AWAY_TEAM_MEMBER_STORAGE_KEY, userID);
        resolve(userID);
    });
}

/**
 * Remove provided user ID from list of users in away team in local storage
 */
export function removeUserFromAwayTeam(userID) {
    return new Promise((resolve, reject) => {
        const awayTeamJSON = localStorage.getItem(AWAY_TEAM_MEMBER_STORAGE_KEY);
        if (!awayTeamJSON) {
            return resolve(userID);
        }
        try {
            const users = JSON.parse(awayTeamJSON);
            localStorage.setItem(AWAY_TEAM_MEMBER_STORAGE_KEY, JSON.stringify(users.filter((user) => user !== userID)));
        } catch (e) {
            //If JSON parsing the user list fails, just clear the entire key
            localStorage.removeItem(AWAY_TEAM_MEMBER_STORAGE_KEY);
        }
        resolve(userID);
    });
}
