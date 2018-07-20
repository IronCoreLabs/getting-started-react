import * as Utils from "../lib/Utils";

export function createOrder(text) {
    const newOrder = {
        id: Math.random()
            .toString(36)
            .slice(2),
        data: text,
        created: Date.now(),
    };

    Utils.addOrderToStorage(newOrder);

    return {
        type: "ADD_ORDER",
        payload: newOrder,
    };
}
