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
import {keyframes} from "@emotion/react";
import {css} from "@emotion/css";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const initLoader = css`
    position: relative;
    &:before {
        animation: ${rotate} 1.5s infinite;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-radius: 50%;
        border-right: 5px solid transparent;
        border-top: 5px solid #ee2e2a;
        content: "";
        height: 60px;
        position: absolute;
        width: 60px;
        z-index: 9;
    }
`;

const rootStyles = css`
    display: flex;
    flex-direction: row;
    height: 100%;

    header {
        flex: 0 1 auto;
    }

    main {
        flex: 1 1 auto;
    }
`;

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
                this.setState({initializing: false, error: false});
            })
            .catch(() => this.setState({initializing: false, error: true}));
    }

    /**
     * Get markup for when the app is initializing the app.
     */
    getInitializingMarkup() {
        return (
            <div className={classes.loaderWrapper}>
                <div className={initLoader}>
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
                    <div>An error occured while initializing the IronCore service. Please refresh and try again.</div>
                </div>
            );
        }
        return (
            <div className={rootStyles}>
                <Header />
                <main className={classes.main}>
                    <div className={classes.orderSection} id="dcp-gs-chunk">
                        <NewOrderForm />
                        <OrderList />
                    </div>
                </main>
            </div>
        );
    }
}

export default connect(
    null,
    { setAwayTeam }
)(App);
