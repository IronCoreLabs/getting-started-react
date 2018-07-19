import * as React from "react";
import {css} from "emotion";
import AvatarImage from "./AvatarImage";
import OrderList from "./OrderList";
import Button from "./Button";
import kirk from "../avatars/kirk.jpg";

const rootStyles = css({
    padding: "10px 0",
    marginBottom: 15,
    borderBottom: "1px solid #bac6cd",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    "& img": {
        marginRight: 20,
    },
});

const encryptInput = css({
    width: "100%",
    "& h3": {
        marginTop: 15,
    },
    "& input": {
        backgroundColor: "#fff",
        border: "1px solid #D9D9D9",
        borderLeft: "3px solid #F44336",
        borderRadius: 2,
        boxShadow: "none",
        fontSize: 14,
        height: 24,
        lineHeight: 1.5,
        margin: "20px 5px",
        maxWidth: 550,
        padding: "3px 8px",
        width: "100%",
    },
});

export default () => {
    return (
        <div className={rootStyles}>
            <div>
                <AvatarImage src={kirk} />
            </div>
            <div className={encryptInput}>
                <h2>Kirk, encrypt your order:</h2>
                <input type="text" placeholder="Enter your order..." />
                <Button>Encrypt</Button>
                <h3>Your encrypted orders:</h3>
                <OrderList
                    orders={[
                        {
                            documentID: Math.random()
                                .toString(36)
                                .slice(2),
                            data: "Orb/ftBfVn2NgyoxByvwdL4Xk8GHlBCCusCY10ED",
                        },
                        {
                            documentID: Math.random()
                                .toString(36)
                                .slice(2),
                            data: "Orb/ftBfVn2EgseESgteSETgsSEGsEtgseyvwdL4Xk8GHlBCCusCY10ED",
                        },
                    ]}
                />
            </div>
        </div>
    );
};
