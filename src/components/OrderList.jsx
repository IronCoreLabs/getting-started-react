import * as React from "react";
import {connect} from "react-redux";
import {getOrder, listOrders} from "../actions/OrderActions";
import insignia from "../avatars/insignia.png";
import {stylesListToClassNames} from "../lib/Utils";
import AvatarHoverAction from "./AvatarHoverAction";
import LoadingPlaceholder from "./LoadingPlaceholder";
import Paper from "./Paper";

const classes = stylesListToClassNames({
    headerText: {
        color: "#BDBDBD",
        fontFamily: "Monaco",
        fontSize: 16,
        letterSpacing: "-0.4px",
        marginBottom: 20,
        marginTop: 25,
    },
    listWarning: {
        lineHeight: 1.125,
        margin: "30px 0",
        maxWidth: 525,
        padding: "10px 15px",
        textAlign: "center",
    },
    warning: {backgroundColor: "#FDDC3B"},
    info: {backgroundColor: "#0ABFD6"},
    icon: {marginRight: 15},
    orderRow: {
        borderBottom: "1px solid #E4E4E4",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        marginLeft: "-15px",
        padding: "10px 30px",
        width: "calc(100% - 15px)",
        "&:last-child": {borderBottom: "none"},
        "&:hover": {backgroundColor: "#EEE"},
    },
    orderHeader: {
        alignItems: "center",
        display: "flex",
        position: "relative",
    },
    todoTitle: {
        fontWeight: "bold",
        marginLeft: 20,
    },
    timestamp: {
        position: "absolute",
        right: 0,
    },
    orderBody: {
        marginTop: 20,
        paddingLeft: 15,
    },
    emptyOrderList: {
        alignItems: "center",
        border: "3px dashed #CCC",
        display: "flex",
        fontSize: 18,
        height: 235,
        justifyContent: "center",
        marginTop: 10,
    },
});

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        props.listOrders();
        this.state = {
            loadingRow: false,
            expandedRow: "",
            activeUser: props.activeUser,
        };
    }

    /**
     * Prop updates to determine if we should clear the loading and/or currently expanded order row
     */
    static getDerivedStateFromProps(nextProps, state) {
        //If we've loaded the data for the current expanded row, clear the loading state
        if (state.expandedRow && typeof nextProps.orders[state.expandedRow].body === "string") {
            return {loadingRow: false, activeUser: nextProps.activeUser};
        }
        //If the currently logged in user changes, reset the currently expanded row
        if (nextProps.activeUser !== state.activeUser) {
            return {expandedRow: null, activeUser: nextProps.activeUser};
        }
        return null;
    }

    /**
     * Order row click handler. Checks if we've already loaded this data to display. If not, makes a request to
     * the API to load the order content.
     */
    expandRow(orderID) {
        //If the user is collapsing this order, just clear out the expandedRow state
        if (this.state.expandedRow === orderID) {
            return this.setState({expandedRow: null});
        }
        //If the data has already been loaded, just display it
        if (typeof this.props.orders[orderID].body === "string") {
            return this.setState({expandedRow: orderID});
        }
        //Otherwise, set a loading indicator and request the order
        this.setState({expandedRow: orderID, loadingRow: true});
        this.props.getOrder(orderID, () => this.setState({loadingRow: false, expandedRow: null}));
    }

    /**
     * Conditionally return the order body content depending on whether the data needs to be loaded first
     */
    getOrderBody(order) {
        if (this.state.expandedRow === null || this.state.expandedRow !== order.id) {
            return null;
        }
        return <div className={classes.orderBody}>{this.state.loadingRow ? <LoadingPlaceholder /> : order.body}</div>;
    }

    /**
     * Display a warning above the order list if the current logged in user isn't part of the away team group
     */
    getWarningHeader() {
        if (this.props.isActiveUserInGroup) {
            return (
                <div className={`${classes.listWarning} ${classes.info}`}>
                    <i className={`fas fa-info-circle ${classes.icon}`}></i>
                    You are a member of the away-team group.
                </div>
            );
        }
        return (
            <div className={`${classes.listWarning} ${classes.warning}`}>
                <i className={`fas fa-exclamation-triangle ${classes.icon}`}></i>
                You are NOT a member of the away-team group therefore you will not be able to decrypt orders.
            </div>
        );
    }

    /**
     * Get list of orders and display them as individual rows
     */
    getAwayTeamOrders() {
        const ordersArray = Object.keys(this.props.orders)
            .map((orderID) => this.props.orders[orderID])
            .sort((a, b) => a.created > b.created);

        if (ordersArray.length === 0) {
            return (
                <div className={classes.emptyOrderList}>
                    <div>No orders created yet.</div>
                </div>
            );
        }
        return ordersArray.map((order) => {
            return (
                <div key={order.id} className={classes.orderRow} onClick={() => this.expandRow(order.id)}>
                    <div className={classes.orderHeader}>
                        <AvatarHoverAction src={insignia} size={45} />
                        <div className={classes.todoTitle}>{order.title}</div>
                        <div className={classes.timestamp}>{new Date(order.created).toLocaleTimeString()}</div>
                    </div>
                    {this.getOrderBody(order)}
                </div>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.getWarningHeader()}
                <h3 className={classes.headerText}>Decrypt an order:</h3>
                <Paper className={classes.paper}>{this.getAwayTeamOrders()}</Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders,
    activeUser: state.activeUser,
    isActiveUserInGroup: state.awayTeam.members.indexOf(state.activeUser.id) > -1,
});

export default connect(
    mapStateToProps,
    {listOrders, getOrder}
)(OrderList);
