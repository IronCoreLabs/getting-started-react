import * as React from "react";

export default () => {
    return (
        <article>
            <div className="input-container-decrypt">
                {/* TODO: This needs to dynamically change based on which user we are currently acting under */}
                <img src={require("../styles/assets/kirk.jpg")} alt="crew-member-headshot" height="110" width="110" id="crew-member-headshot" />
                <div className="decrypt-order-input">
                    <h2>Decrypt your order as:</h2>
                    <select id="crew-member">
                        <option value="kirk">Kirk</option>
                        <option value="spock">Spock</option>
                        <option value="mccoy">McCoy</option>
                        <option value="scotty">Scotty</option>
                        <option value="sulu">Sulu</option>
                        <option value="chekov">Chekov</option>
                        <option value="redshirt">Red Shirt</option>
                    </select>
                </div>
            </div>
            <select id="order-id-to-decrypt">
                <option value="">Choose your order to decrypt...</option>
            </select>
            <input type="text" id="order-ciphertext" placeholder="Your encrypted order" />
            <button id="decrypt-button">Decrypt</button>
            <div id="decrypted-orders-container" className="decrypted-orders table-container">
                <h3>Your decrypted orders:</h3>
                <table id="decrypted-orders">
                    <thead>
                        <th>Order Id</th>
                        <th>Decrypted Order</th>
                    </thead>
                    <tbody />
                </table>
            </div>
        </article>
    );
};
