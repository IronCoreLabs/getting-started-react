import * as React from "react";
import {connect} from "react-redux";
import {setAwayTeam} from "./actions/AwayTeamActions";
import Header from "./components/Header";
import OrderList from "./components/OrderList";
import NewOrderForm from "./components/NewOrderForm";
import AwayTeamManagement from "./components/AwayTeamManagement";
import {initializeAsUser, getTestGroupDetails} from "./lib/Initialization";
import {KIRK} from "./Constants";
import {stylesListToClassNames} from "./lib/Utils";
import logo from "./logo-black.svg";

const classes = stylesListToClassNames({
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "space-around",
        backgroundColor: "#F6F8FA",
        "& h1": {
            margin: 20,
        },
    },
    // panelSections: {
    //     marginTop: 40,
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "space-between",
    // },
    orderSection: {minWidth: 550},
    loaderWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
    },
    rowAlign: {
        display: "flex",
        alignItems: "row",
        justifyContent: "space-around"
    },
    cardHeight: {
        height: "500px"
    },
    centerItems: {
        justifyContent: "center"
    }
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
                <div id="initLoader">
                    <img src={logo} height="200" width="200" alt="" />
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
                <div className={classes.rowAlign}>
                    <h1>Welcome to the Enterprise Messaging System</h1>
                </div>
                <div className={classes.centerItems}>
                    <AwayTeamManagement />
                </div>
                <div className={classes.rowAlign}>
                    <OrderList />
                    <NewOrderForm />
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    {setAwayTeam}
)(App);
