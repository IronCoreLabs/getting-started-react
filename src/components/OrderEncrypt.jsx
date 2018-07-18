import * as React from "react";
import kirk from "../avatars/kirk.jpg";

export default () => {
    return (
        <article>
            <div className="input-container">
                <img src={kirk} alt="kirk-headshot" height="110" width="110" />
                <div className="encrypt-order-input">
                    <h2>Kirk, encrypt your order:</h2>
                    <div className="form">
                        <div className="encrypt-order">
                            <input type="text" id="order" placeholder="Enter your order..." />
                            <button id="encrypt-button">Encrypt</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="encrypted-orders-container" className="table-container">
                <h3>Your encrypted orders:</h3>
                <table id="encrypted-orders">
                    <thead>
                        <th>Order Id</th>
                        <th>Encrypted Order</th>
                    </thead>
                    <tbody />
                </table>
            </div>
        </article>
    );
};
