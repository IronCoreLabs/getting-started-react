import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";
import apiMiddleware from "./middleware/ApiMiddleware";
import * as IronCoreMiddleware from "./middleware/IronCoreMiddleware";
import "./index.css";
import rootReducer from "./reducers";
import App from "./App";

//Polyfills
import "whatwg-fetch";
import "es6-promise/auto";

// prettier-ignore
const store = createStore(
    rootReducer,
    applyMiddleware(
        ReduxThunk,
        IronCoreMiddleware.encryptionMiddleware,
        apiMiddleware,
        IronCoreMiddleware.decryptionMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
