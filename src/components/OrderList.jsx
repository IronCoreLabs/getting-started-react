import * as React from "react";
import {connect} from "react-redux";
import Paper from "./Paper";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    root: {
        marginTop: 5,
        "& h2": {textAlign: "center"},
    },
    orderList: {
        display: "flex",
    },
    orderTag: {
        width: 0,
        height: 0,
        borderTop: "45px solid #64B5F6",
        borderRight: "45px solid transparent",
    },
});

class OrderList extends React.Component {
    getOrderMarkup(order) {
        let displayedData = order.data;
        if (displayedData.length > 150) {
            displayedData = displayedData.substring(0, 145) + "...";
        }
        return (
            <Paper size={150} key={order.id} cornerTagIcon="fas fa-plus" cornerTagColor="#64B5F6">
                {displayedData}
            </Paper>
        );
    }

    render() {
        return (
            <div className={classes.root}>
                <h2>Away Team Orders</h2>
                <div className={classes.orderList}>{this.props.orders.map(this.getOrderMarkup)}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    orders: Object.keys(state.orders)
        .map((orderID) => state.orders[orderID])
        .sort((a, b) => a.created > b.created),
});

export default connect(mapStateToProps)(OrderList);
