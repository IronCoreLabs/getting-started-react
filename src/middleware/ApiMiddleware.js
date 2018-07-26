/**
 * Redux middleware function that is responsible for kicking off API requests and dispatches an action once the
 * Promise has resolved successfully.
 */
export default (store) => (next) => (action) => {
    if (typeof action.operation === "function") {
        //Get the arguments to invoke the operation with into an array so we can use the spread syntax
        const operationArguments = action.payload ? (Array.isArray(action.payload) ? action.payload : [action.payload]) : [];
        action
            .operation(...operationArguments)
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
