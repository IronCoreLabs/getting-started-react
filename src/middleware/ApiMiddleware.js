/**
 * Redux middleware function that is responsible for kicking off API requests and dispatches an action once the
 * Promise has resolved successfully.
 */
const middleware = (store) => (next) => (action) => {
    if (typeof action.operation === "function") {
        action
            .operation(action.payload)
            .then((result) => {
                next({...action, type: action.type, payload: result});
                if (action.onSuccess) {
                    action.onSuccess();
                }
            })
            .catch((e) => {
                console.error(e);
                if (action.onFail) {
                    action.onFail();
                }
            });
    } else {
        //If this isn't an API operation, just bypass this middleware and hand it to the next one
        next(action);
    }
};

export default middleware;
