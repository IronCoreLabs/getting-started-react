import * as React from "react";
import {css} from "emotion";
import Header from "./components/Header";
import OrderList from "./components/OrderList";
import NewOrderForm from "./components/NewOrderForm";
import AwayTeamManagement from "./components/AwayTeamManagement";

const mainStyles = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
    "& h1": {
        margin: 20,
    },
});

const panelSections = css({
    marginTop: 40,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
});

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main className={mainStyles}>
                    <h1>Welcome to the Enterprise Messaging System</h1>
                    <div className={panelSections}>
                        <div>
                            <OrderList />
                            <NewOrderForm />
                        </div>
                        <AwayTeamManagement />
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
