import * as React from "react";
import { css } from "emotion";
import { stylesListToClassNames } from "../lib/Utils";

const classes = stylesListToClassNames({
    root: {
        cursor: "pointer",
        borderRadius: "100%",
        overflow: "hidden",
    },
    overlay: {
        background: "rgba(0,0,0,0.7)",
        textAlign: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
});

export default ({ src, iconClasses, clickAction, iconColor, loading, size }) => {
    size = size || 110;
    const backgroundImage = css({ background: `url(${src}) 0 0 no-repeat`, backgroundSize: "cover", height: size, width: size });
    const iconStyle = css({ color: iconColor });

    const icon = loading ? <i className={`${iconStyle} fas fa-spinner fa-spin`} /> : <i className={`${iconStyle} ${iconClasses} fa-3x`} />;
    const overlayStyles = loading ? css({ opacity: 0.75 }) : iconClasses ? css({ "&:hover": { opacity: 0.75 } }) : "";

    return (
        <div className={`${classes.root} ${backgroundImage}`} onClick={clickAction}>
            <div className={`${classes.overlay} ${overlayStyles}`}>{icon}</div>
        </div>
    );
};
