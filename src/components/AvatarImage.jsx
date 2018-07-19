import * as React from "react";
import {css} from "emotion";

const avatarStyle = css({
    borderRadius: "100%",
    height: 80,
    width: 80,
});

export default ({src}) => {
    return <img className={avatarStyle} src={src} alt="" />;
};
