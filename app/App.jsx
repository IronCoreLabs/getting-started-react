import * as React from "react";
import Nav from "./components/Nav";
import OrderEncrypt from "./components/OrderEncrypt";
import AwayTeamSelection from "./components/AwayTeamSelection";
import OrderDecryption from "./components/OrderDecryption";

export default class App extends React.Component {
    render() {
        return (
            <main>
                <Nav />
                <section>
                    <OrderEncrypt />
                    <AwayTeamSelection />
                    <OrderDecryption />
                </section>
                <pre id="logger" />
                <div id="loadbar" />
            </main>
        );
    }
}
