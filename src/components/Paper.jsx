import * as React from "react";
import {css} from "emotion";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    paper: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#fff",
        wordBreak: "break-word",
        borderRadius: 5,
        height: "330px",
        width: "410px",
        overflow: "scroll"
    },
});

export default ({children, size}) => {
    // const fixedSize = size || "auto";
    const paperWithSize = css(classes.paper);

    return <div className={paperWithSize}>{children}</div>;
};
