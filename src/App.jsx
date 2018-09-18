import * as React from "react";
import { connect } from "react-redux";
import { setAwayTeam } from "./actions/AwayTeamActions";
import Header from "./components/Header";
import OrderList from "./components/OrderList";
import NewOrderForm from "./components/NewOrderForm";
import { initializeAsUser, getTestGroupDetails } from "./lib/Initialization";
import { KIRK } from "./Constants";
import { stylesListToClassNames } from "./lib/Utils";
import logo from "./logo-black.svg";

const classes = stylesListToClassNames({
    main: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        "& h1": {
            margin: 20,
        },
    },
    orderSection: {
        maxWidth: 550,
        width: "100vw",
    },
    loaderWrapper: {
        alignItems: "center",
        display: "flex",
        height: "90vh",
        justifyContent: "center",
    },
});

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            initializing: true,
            error: false,
        };

        /**
         * Initialize as Kirk and optionally do away team creation if necessary
         */
        initializeAsUser(KIRK)
            .then(() => getTestGroupDetails())
            .then((group) => {
                this.props.setAwayTeam(group);
                this.setState({ initializing: false, error: false });
            })
            .catch(() => this.setState({ initializing: false, error: true }));
    }

    /**
     * Get markup for when the app is initializing the app.
     */
    getInitializingMarkup() {
        return (
            <div className={classes.loaderWrapper}>
                <div id="initLoader">
                    <img src={logo} height="70" width="70" alt="" />
                </div>
            </div>
        );
    }

    render() {
        if (this.state.initializing) {
            return this.getInitializingMarkup();
        }
        if (this.state.error) {
            return (
                <div className={classes.loaderWrapper}>
                    <div>An error occured while initializing the IronCore service. Please refresh and try again"</div>
                </div>
            );
        }
        return (
            <React.Fragment>
                <Header />
                <main className={classes.main}>
                    <div className={classes.orderSection}>
                        <NewOrderForm />
                        <OrderList />
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    { setAwayTeam }
)(App);
