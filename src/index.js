import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";
import "./index.css";
import rootReducer from "./reducers";
import App from "./App";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
