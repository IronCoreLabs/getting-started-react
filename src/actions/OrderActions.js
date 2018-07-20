import * as Utils from "../lib/Utils";

export function createOrder(text) {
    //This is an async action as you'd usually make an API call here to save this data to a DB
    //somewhere on the backend. We don't technically need that for storing to local storage,
    //but in order to mock out an async action we'll do it that way anyway.
    //return (dispatch) => {

    //};
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
