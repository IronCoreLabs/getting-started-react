import {getOrders} from "../lib/Utils";

const defaultState = getOrders();

/**
 * Orders reducer. Keeps track of list of orders and adds new ones to the list.
 */
export default function(state = defaultState, action) {
    if (action.type === "ADD_ORDER") {
        return {
            ...state,
            [action.payload.id]: action.payload,
        };
    }
    return state;
}
