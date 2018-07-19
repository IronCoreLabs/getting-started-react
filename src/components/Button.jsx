import * as React from "react";
import {css} from "emotion";

const buttonStyle = css({
    background: "#F44336",
    borderRadius: 4,
    color: "#FFF",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 200,
    padding: "6px 20px",
    textTransform: "uppercase",
});

export default ({callback, children}) => {
    return (
        <button className={buttonStyle} onClick={callback}>
            {children}
        </button>
    );
};
