import * as React from "react";
import {css} from "emotion";

const rootStyles = css({
    display: "flex",
    marginTop: 5,
});

const cardStyles = css({
    height: 110,
    width: 125,
    padding: 15,
    margin: 10,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.10)",
    backgroundColor: "#fff",
    position: "relative",
    wordBreak: "break-word",
    "& span": {
        position: "absolute",
        bottom: 2,
        left: 2,
        fontSize: 13,
    },
});

export default ({orders}) => {
    const orderCards = orders.map((order) => {
        let displayedData = order.data;
        if (displayedData.length > 60) {
            displayedData = displayedData.substring(0, 55) + "...";
        }
        return (
            <div key={order.documentID} className={cardStyles}>
                <div>{displayedData}</div>
                <span>{`ID: ${order.documentID}`}</span>
            </div>
        );
    });

    return <div className={rootStyles}>{orderCards}</div>;
};
