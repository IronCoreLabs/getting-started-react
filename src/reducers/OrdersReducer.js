const defaultState = {};

/**
 * Orders reducer. Keeps track of list of orders and adds new ones to the list.
 */
export default function(state = defaultState, action) {
    if (action.type === "LIST_ORDERS") {
        //Convert the array of orders into an object from order ID -> order
        return action.payload.reduce((ordersByID, order) => {
            ordersByID[order.id] = order;
            return ordersByID;
        }, {});
    }
    if (action.type === "GET_ORDER") {
        //Update the order by ID to include the additional details from the full GET request
        return {
            ...state,
            [action.payload.id]: action.payload,
        };
    }
    if (action.type === "ADD_ORDER") {
        //Add new order to state keyed by it's ID
        return {
            ...state,
            [action.payload.id]: {
                ...action.payload,
                body: undefined,
            },
        };
    }
    if (action.type === "SWITCH_USER") {
        //When switching users, remove all data from the list of orders
        return Object.keys(state).reduce((orders, orderID) => {
            const {body, ...sansData} = state[orderID];
            orders[orderID] = sansData;
            return orders;
        }, {});
    }
    return state;
}
