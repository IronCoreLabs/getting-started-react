import * as React from "react";
import {css} from "emotion";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    root: {
        height: 110,
        width: 110,
        cursor: "pointer",
        borderRadius: "100%",
        overflow: "hidden",
        "&:hover > div": {
            opacity: 0.75,
        },
    },
    overlay: {
        background: "rgba(0,0,0,0.7)",
        textAlign: "center",
        padding: "33px 0 43px 1px",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
});

export default ({src, iconClasses, clickAction, iconColor}) => {
    const backgroundImage = css({background: `url(${src}) 0 0 no-repeat`, backgroundSize: "cover"});
    const icon = css({color: iconColor});

    return (
        <div className={`${classes.root} ${backgroundImage}`} onClick={clickAction}>
            <div className={classes.overlay}>
                <i className={`${icon} ${iconClasses} fa-3x`} />
            </div>
        </div>
    );
};
