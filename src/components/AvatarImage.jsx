import * as React from "react";
import {css} from "emotion";

const avatarStyle = css({borderRadius: "100%"});

export default ({src, size}) => {
    size = size || 80;
    return <img className={avatarStyle} src={src} height={size} width={size} alt="" />;
};
