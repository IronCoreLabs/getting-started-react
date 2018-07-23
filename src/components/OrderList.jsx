import * as React from "react";
import {connect} from "react-redux";
import {listOrders, getOrder} from "../actions/OrderActions";
import Paper from "./Paper";
import LoadingPlaceholder from "./LoadingPlaceholder";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    headerText: {
        textAlign: "center",
        marginTop: 25,
    },
    orderList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
    },
    orderRow: {
        padding: "15px 7px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #ccc",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#ddd",
        },
    },
    orderHeader: {
        display: "flex",
        justifyContent: "space-between",
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
        width: 400,
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
            expandedRow: null,
        };
    }

    expandRow(orderID) {
        //If the user is collapsing this order, just clear out the expandedRow state
        if (this.state.expandedRow === orderID) {
            return this.setState({expandedRow: null});
        }
        //If the data has already been loaded, just display it
        if (typeof this.props.orders[orderID].data === "string") {
            return this.setState({expandedRow: orderID});
        }
        //Otherwise, set a loading indicator and request the order
        this.setState({expandedRow: orderID, loadingRow: true});
        this.props.getOrder(orderID, () => {
            this.setState({loadingRow: false});
        });
    }

    getOrderBody(order) {
        if (this.state.expandedRow === null || this.state.expandedRow !== order.id) {
            return null;
        }
        if (this.state.loadingRow) {
            return <LoadingPlaceholder />;
        }
        return <div className={classes.orderBody}>{order.data}</div>;
    }

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
                        <div>To: Away Team</div>
                        <div>{new Date(order.created).toLocaleTimeString()}</div>
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
                <Paper className={classes.orderList}>{this.getAwayTeamOrders()}</Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders,
});

export default connect(
    mapStateToProps,
    {listOrders, getOrder}
)(OrderList);
