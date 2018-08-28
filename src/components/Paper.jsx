import * as React from "react";
import {css} from "emotion";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    paper: {
        padding: 15,
        overflow: "hidden",
        margin: 10,
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#fff",
        wordBreak: "break-word",
        borderRadius: 5,
    },
});

export default ({children, height, width}) => {
    const fixedHeight = height || "auto";
    const fixedWidth = width || "auto";
    const paperWithSize = css(classes.paper, {height: fixedHeight, width: fixedWidth});

    return <div className={paperWithSize}>{children}</div>;
};
