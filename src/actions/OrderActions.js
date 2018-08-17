import * as Api from "../lib/Api";

/**
 * List the orders available.
 */
export function listOrders() {
    return {
        type: "LIST_ORDERS",
        operation: Api.listOrders,
    };
}

/**
 * Get a specific order given it's ID.
 */
export function getOrder(orderID, onFail) {
    return {
        type: "GET_ORDER",
        payload: orderID,
        operation: Api.getOrder,
        onFail,
    };
}

/**
 * Create a new order given the text with which to create it.
 */
export function createOrder(title, body, onSuccess, onFail) {
    return {
        type: "ADD_ORDER",
        payload: {
            title,
            body,
        },
        operation: Api.createOrder,
        onSuccess,
        onFail,
    };
}
