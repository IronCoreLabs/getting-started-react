import * as React from "react";
import {css} from "emotion";
import AvatarImage from "./AvatarImage";
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

const decryptUser = css({
    width: "100%",
    "& h2": {
        display: "inline",
    },
    "& select": {
        background: "transparent",
        border: 0,
        borderBottom: "1px solid #000",
        cursor: "pointer",
        fontSize: 24,
        marginLeft: 10,
        paddingLeft: 10,
        borderRadius: 0,
        justifyContent: "center",
        width: 150,
        appearance: "none",
        "&:focus": {outline: "none"},
    },
});

export default () => {
    return (
        <div className={rootStyles}>
            <div>
                <AvatarImage src={kirk} />
            </div>
            <div>
                <div className={decryptUser}>
                    <h2>Decrypt your order as:</h2>
                    <select>
                        <option value="kirk">Kirk</option>
                        <option value="spock">Spock</option>
                        <option value="mccoy">McCoy</option>
                        <option value="scotty">Scotty</option>
                        <option value="sulu">Sulu</option>
                        <option value="chekov">Chekov</option>
                        <option value="redshirt">Red Shirt</option>
                    </select>
                </div>
                <select>
                    <option value="">Choose your order to decrypt...</option>
                </select>
                <input type="text" placeholder="Your encrypted order" />
                <Button>Decrypt</Button>
            </div>
        </div>
    );
};
