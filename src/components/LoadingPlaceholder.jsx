import * as React from "react";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 0,
    },
});

/**
 * Display a block with an icon used to denote a loading section
 */
export default function() {
    return (
        <div className={classes.root}>
            <i className="fas fa-spinner fa-spin fa-2x" />
        </div>
    );
}
