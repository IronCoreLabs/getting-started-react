import * as React from "react";
import {css} from "emotion";
import Button from "./Button";

const rootStyles = css({
    padding: "25px 0",
    marginBottom: 15,
    borderBottom: "1px solid #bac6cd",
    "& h2": {
        paddingBottom: 20,
    },
});

const teamSelection = css({
    display: "flex",
});

const listDisplay = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& h3": {
        paddingBottom: 10,
    },
    "& select": {
        width: 225,
        margin: "0 20px 20px 0",
    },
});

export default () => {
    return (
        <div className={rootStyles}>
            <h2>Kirk, select your away team:</h2>
            <div className={teamSelection}>
                <div className={listDisplay}>
                    <h3>Crew:</h3>
                    <select multiple="multiple" size="6">
                        <option value="spock">Spock</option>
                        <option value="mccoy">McCoy</option>
                        <option value="scotty">Scotty</option>
                        <option value="sulu">Sulu</option>
                        <option value="chekov">Chekov</option>
                        <option value="redshirt">Red Shirt</option>
                    </select>
                    <Button>Add</Button>
                </div>
                <div className={listDisplay}>
                    <h3>Away team:</h3>
                    <select multiple="multiple" size="6" />
                    <Button>Remove</Button>
                </div>
            </div>
        </div>
    );
};
