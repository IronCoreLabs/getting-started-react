import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import apiMiddleware from "./middleware/ApiMiddleware";
import "./index.css";
import rootReducer from "./reducers";
import App from "./App";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
