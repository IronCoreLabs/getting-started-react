import * as React from "react";
import {render as reactRender} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./App";
import "es6-promise/auto";
import "whatwg-fetch";
import css from "../app/styles/styles.css";

const render = (RootApp) => {
    reactRender(
        <AppContainer>
            <RootApp />
        </AppContainer>,
        document.getElementById("root")
    );
};

render(App);

if (module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        render(NextApp);
    });
}
