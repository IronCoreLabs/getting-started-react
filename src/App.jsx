import * as React from "react";
import {connect} from "react-redux";
import {setAwayTeam} from "./actions/AwayTeamActions";
import Header from "./components/Header";
import OrderList from "./components/OrderList";
import NewOrderForm from "./components/NewOrderForm";
import AwayTeamManagement from "./components/AwayTeamManagement";
import {initializeAsUser, returnIsInitialized, getTestGroupDetails, deauthDevice} from "./lib/Initialization";
import {KIRK} from "./Constants";
import {stylesListToClassNames} from "./lib/Utils";
import Button from "./components/atom/Button";
import HorizontalLogoBlack from "./components/icons/HorizontalLogoBlack";
import Paper from "./components/Paper";
import logo from "./logo-black.svg";

const classes = stylesListToClassNames({
    main: {
        alignItems: "center",
        backgroundColor: "#F6F8FA",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        width: "100vw",
        "& h1": {
            margin: 20,
        },
    },
    initPanel: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        width: "100%",
    },
    panelSections: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: 40,
        width: "100%",
    },
    orderSection: {minWidth: 550},
    mainText: {
        lineHeight: "1.3",
        marginTop: "-180px !important",
    },
    logo: {
        left: 50,
        position: "absolute",
    },
    button: {
        color: "#000 !important",
    },
    refreshIcon: {
        marginRight: 15,
    },
});

export class App extends React.Component {
    constructor() {
        super();
        this.state = {loading: false, error: false};
    }

    /**
     * Trigger initialization and set the loading state to true until initialization completes.
     */
    handleInitClick() {
        this.initIronWebSDK();
        this.setState({loading: true});
    }

    /**
     * Initialize as Kirk and optionally do away team creation if necessary
     */
    initIronWebSDK() {
        initializeAsUser(KIRK)
            .then(() => getTestGroupDetails())
            .then((group) => {
                this.props.setAwayTeam(group);
                this.setState({loading: false, error: false});
            })
            .catch(() => this.setState({loading: false, error: true}));
    }

    /**
     * Get markup for when the app is initializing the app.
     */
    getInitPageMarkup() {
        return (
            <div className={classes.main}>
                <Paper height="600px" width="320px">
                    <div className={classes.initPanel}>
                        <HorizontalLogoBlack height="50" width="200" alt="IronCore Logo" className={classes.logo} />
                        <h1 className={classes.mainText}>Initialize IronWeb SDK to get started.</h1>
                        <Button classes={classes.button} buttonAction={() => this.handleInitClick()}>
                            Initialize IronWeb SDK
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }

    /**
     * Get markup for when the app is loading.
     */
    getLoadingMarkup() {
        return (
            <div className={classes.main}>
                <div id="initLoader">
                    <img src={logo} height="70" width="70" alt="" />
                </div>
            </div>
        );
    }

    /**
     * Get markup for when an error initializing the IronWeb SDK occurs.
     */
    getErrorMarkup() {
        return (
            <div className={classes.main}>
                <Paper height="600px" width="320px">
                    <div className={classes.initPanel}>
                        <h1>Woops! An Error Occured</h1>
                        <h4 className={classes.mainText}>An error occured while initializing the IronCore service. Please refresh your page to try again.</h4>
                        <Button buttonAction={window.location.reload()}>
                            <i className={`${classes.refreshIcon} fas fa-sync-alt`} />
                            Refresh
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return this.getLoadingMarkup();
        }
        if (!returnIsInitialized()) {
            return this.getInitPageMarkup();
        }
        if (this.state.error) {
            return this.getErrorMarkup();
        }
        return (
            <React.Fragment>
                <Header />
                <main className={classes.main}>
                    <h1>Welcome to the Enterprise Messaging System</h1>
                    <div className={classes.panelSections}>
                        <div className={classes.orderSection}>
                            <OrderList />
                            <NewOrderForm />
                        </div>
                        <AwayTeamManagement />
                    </div>
                </main>
                <button onClick={deauthDevice()}>DeAuth Device</button>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    {setAwayTeam}
)(App);
