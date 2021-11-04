import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";
import apiMiddleware from "./middleware/ApiMiddleware";
import * as IronCoreMiddleware from "./middleware/IronCoreMiddleware";
import rootReducer from "./reducers";
import App from "./App";

//Polyfills for older browsers that don't support Promises or fetch()
import "whatwg-fetch";
import "es6-promise/auto";

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

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
