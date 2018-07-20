import * as React from "react";
import {css} from "emotion";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    paper: {
        padding: 15,
        overflow: "hidden",
        margin: 10,
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#fff",
        wordBreak: "break-word",
        borderRadius: 5,
    },
});

export default ({children, size, cornerTagIcon, cornerTagColor}) => {
    const fixedSize = size || "auto";
    const paperWithSize = css(classes.paper, {height: fixedSize, width: fixedSize});

    return <div className={paperWithSize}>{children}</div>;
};
