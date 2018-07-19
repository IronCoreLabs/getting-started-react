import React from "react";
import ReactDOM from "react-dom";
import * as Redux from "redux";
import {Provider} from "react-redux";
import "./index.css";
import rootReducer from "./reducers";
import App from "./App";

const store = Redux.createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
