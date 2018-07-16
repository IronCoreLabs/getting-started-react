import * as React from "react";

export default () => {
    return (
        <article>
            <h2>Kirk, select your away team:</h2>
            <div className="away-team-select">
                <div>
                    <h3>Crew:</h3>
                    <select multiple="multiple" size="6" id="from-element">
                        <option value="spock">Spock</option>
                        <option value="mccoy">McCoy</option>
                        <option value="scotty">Scotty</option>
                        <option value="sulu">Sulu</option>
                        <option value="chekov">Chekov</option>
                        <option value="redshirt">Red Shirt</option>
                    </select>
                    <button id="add-button">Add</button>
                </div>
                <div>
                    <h3>Away team:</h3>
                    <select multiple="multiple" size="6" id="to-element" />
                    <button id="remove-button">Remove</button>
                </div>
            </div>
        </article>
    );
};
