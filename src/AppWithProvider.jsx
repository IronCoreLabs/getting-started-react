import React from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";
import apiMiddleware from "./middleware/ApiMiddleware";
import * as IronCoreMiddleware from "./middleware/IronCoreMiddleware";
import rootReducer from "./reducers";
import App from "./App";

/**
 * Conditionally include the IronCore middleware depending on whether or not
 * we're running the secure version of the app
 */
function getMiddleware() {
    const middleware = [ReduxThunk];
    if (process.env.REACT_APP_SECURE) {
        middleware.push(IronCoreMiddleware.encryptionMiddleware);
    }
    middleware.push(apiMiddleware);
    if (process.env.REACT_APP_SECURE) {
        middleware.push(IronCoreMiddleware.decryptionMiddleware);
    }
    return middleware;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// prettier-ignore
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...getMiddleware())));

const AppWithProvider = (
    <Provider store={store}>
        <App />
    </Provider>
);
export default AppWithProvider;
