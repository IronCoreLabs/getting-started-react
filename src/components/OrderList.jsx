import * as React from "react";
import {connect} from "react-redux";
import {listOrders, getOrder} from "../actions/OrderActions";
import Paper from "./Paper";
import insignia from "../avatars/insignia.png";
import LoadingPlaceholder from "./LoadingPlaceholder";
import AvatarHoverAction from "./AvatarHoverAction";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    headerText: {
        textAlign: "center",
        marginTop: 25,
    },
    listWarning: {
        maxWidth: 525,
        color: "#fefefe",
        lineHeight: 1.125,
        padding: "10px 15px",
        textAlign: "center",
        backgroundColor: "#00BCD4",
        margin: "30px 0",
    },
    orderRow: {
        width: 500,
        padding: "15px 7px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #ccc",
        cursor: "pointer",
        "&:last-child": {borderBottom: "none"},
        "&:hover": {backgroundColor: "#ddd"},
    },
    orderHeader: {
        position: "relative",
        display: "flex",
        alignItems: "center",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        height: 235,
        border: "3px dashed #ccc",
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
        };
    }

    /**
     * Prop updates to determine if we should clear the loading and/or currently expanded order row
     */
    componentWillReceiveProps(nextProps) {
        //If we've loaded the data for the current expanded row, clear the loading state
        if (this.state.expandedRow && typeof nextProps.orders[this.state.expandedRow].body === "string") {
            this.setState({loadingRow: false});
        }
        //If the currently logged in user changes, reset the currently expanded row
        if (nextProps.activeUser !== this.props.activeUser) {
            this.setState({expandedRow: null});
        }
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
            return null;
        }
        return (
            <div className={classes.listWarning}>
                The currently logged in user is not part of the Away Team. That would normally mean that the orders wouldn't be visible to the current user.
                This is usually enforced via access control code to restrict view access.
                <br />
                <br />
                However, to show the extra layer of security that is provided via IronCore we'll display the list of orders and prove how even if they could be
                retrieved, the orders that are encrypted are still safe as they cannot be decyrpted by the current user.
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
                <h3 className={classes.headerText}>Away Team Orders</h3>
                {this.getWarningHeader()}
                <Paper>{this.getAwayTeamOrders()}</Paper>
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
