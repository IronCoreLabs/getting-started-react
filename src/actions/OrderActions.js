import * as Api from "../lib/Api";

/**
 * List the orders available
 */
export function listOrders() {
    return {
        type: "LIST_ORDERS",
        operation: Api.listOrders,
    };
}

/**
 * Get a specific order given it's ID
 */
export function getOrder(orderID, onComplete) {
    return {
        type: "GET_ORDER",
        payload: orderID,
        operation: Api.getOrder,
        onComplete,
    };
}

/**
 * Create a new order given the text to create it with
 */
export function createOrder(text, onComplete) {
    return {
        type: "ADD_ORDER",
        payload: text,
        operation: Api.createOrder,
        onComplete,
    };
}
