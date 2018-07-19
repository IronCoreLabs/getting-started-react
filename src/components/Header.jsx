import * as React from "react";
import logo from "../logo.svg";
import {css} from "emotion";

const navStyle = css({
    alignItems: "center",
    backgroundColor: "#2c2c2c",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    color: "white",
    "& h1": {
        display: "inline",
    },
});

export default () => {
    return (
        <header className={navStyle}>
            <img src={logo} height="60" width="60" alt="" />
            <h1>IronCore Get Started</h1>
        </header>
    );
};
