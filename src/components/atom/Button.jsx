import * as React from "react";
import {stylesListToClassNames} from "../../lib/Utils";

const classes = stylesListToClassNames({
    root: {
        backgroundColor: "#0ABFD6",
        border: "none",
        color: "#fff",
        fontSize: 20,
        height: 50,
        outline: "none",
        width: "100%",
        "&:hover": {
            backgroundColor: "#00ACC2",
        },
    },
});

export default ({children, buttonAction}) => {
    return (
        <button className={classes.root} onClick={buttonAction}>
            {children}
        </button>
    );
};
