import * as React from "react";
import { css } from "emotion";
import { stylesListToClassNames } from "../lib/Utils";

const classes = stylesListToClassNames({
    paper: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)",
        margin: 10,
        overflow: "hidden",
        padding: 15,
        wordBreak: "break-word",
    },
});

export default ({ children, size }) => {
    const fixedSize = size || "auto";
    const paperWithSize = css(classes.paper, { height: fixedSize, width: fixedSize });

    return <div className={paperWithSize}>{children}</div>;
};
