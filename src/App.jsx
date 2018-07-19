import * as React from "react";
import {css} from "emotion";
import Header from "./components/Header";
import OrderEncrypt from "./components/OrderEncrypt";
import AwayTeamSelection from "./components/AwayTeamSelection";
import OrderDecryption from "./components/OrderDecryption";

const panelStyles = css({
    display: "flex",
});

const sectionStyles = css({
    width: "100%",
    padding: 15,
});

const orderPanel = css(sectionStyles, {
    backgroundColor: "#F6F8FA",
    borderRight: "1px solid green",
    boxShadow: "3px 0 5px -1px rgba(0,0,0,0.37)",
});

const logPanel = css(sectionStyles, {
    width: "60%",
});

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main className={panelStyles}>
                    <section className={orderPanel}>
                        <OrderEncrypt />
                        <AwayTeamSelection />
                        <OrderDecryption />
                    </section>
                    <section className={logPanel}>
                        <pre id="logger">adfasdf asdf adsf asdflajdsf</pre>
                        <div id="loadbar" />
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
