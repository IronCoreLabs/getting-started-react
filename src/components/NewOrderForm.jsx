import * as React from "react";
import {connect} from "react-redux";
import Paper from "./Paper";
import {createOrder} from "../actions/OrderActions";
import {stylesListToClassNames} from "../lib/Utils";
import showSnackbar from "../lib/Snackbar";

const classes = stylesListToClassNames({
    headerText: {
        textAlign: "center",
        marginTop: 25,
    },
    orderHeader: {
        fontSize: 18,
        padding: "7px 0",
        margin: "10px 0",
        display: "flex",
        borderBottom: "1px solid #D9D9D9",
        "& :first-child": {
            width: 60,
            fontWeight: "bold",
            padding: "0 7px",
        },
    },
    genericInput: {
        width: "85%",
        fontSize: 18,
        padding: 7,
        border: "1px solid #D9D9D9",
        borderLeft: "3px solid #F44336",
        margin: "15px 0",
        display: "block",
    },
    button: {
        background: "#F44336",
        borderRadius: 4,
        color: "#FFF",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 200,
        padding: "6px 20px",
        textTransform: "uppercase",
    },
    buttonIcon: {margin: "0 10px 0 -7px"},
});

class NewOrderForm extends React.Component {
    constructor() {
        super();
        this.state = {
            orderTitle: "",
            orderBody: "",
            savingOrder: false,
        };
    }

    /**
     * Submit a new order. Does nothing if another order is currently being submitted or
     * the user hasn't entered any order text.
     */
    submitNewOrder() {
        if (this.state.savingOrder || !this.state.orderTitle.trim() || !this.state.orderBody.trim()) {
            return;
        }
        this.setState({savingOrder: true});
        this.props.createOrder(
            this.state.orderTitle.trim(),
            this.state.orderBody.trim(),
            () => {
                this.setState({savingOrder: false, orderTitle: "", orderBody: ""});
                showSnackbar("New order created successfully");
            },
            () => this.setState({savingOrder: false})
        );
    }

    /**
     * Keep order title mirrored in state and update its value.
     */
    updateOrderTitle(event) {
        this.setState({orderTitle: event.target.value});
    }

    /**
     * Keep order body mirrored in state and update its value.
     */
    updateOrderBody(event) {
        this.setState({orderBody: event.target.value});
    }

    render() {
        if (!this.props.isActiveAwayTeamAdmin) {
            return null;
        }
        const iconClasses = this.state.savingOrder ? "fas fa-spinner fa-spin" : "fas fa-broadcast-tower";
        return (
            <React.Fragment>
                <h3 className={classes.headerText}>Add Away Team Order</h3>
                <Paper>
                    <div className={classes.orderHeader}>
                        <div>From:</div>
                        <div>Kirk</div>
                    </div>
                    <div className={classes.orderHeader}>
                        <div>To:</div>
                        <div>Away Team</div>
                    </div>
                    <input
                        className={classes.genericInput}
                        type="text"
                        placeholder="Order Title"
                        value={this.state.orderTitle}
                        onChange={this.updateOrderTitle.bind(this)}
                    />
                    <textarea
                        className={`${classes.textarea} ${classes.genericInput}`}
                        placeholder="Enter your order message..."
                        rows={6}
                        onChange={this.updateOrderBody.bind(this)}
                        value={this.state.orderBody}
                    />
                    <button className={classes.button} onClick={this.submitNewOrder.bind(this)}>
                        <i className={`${classes.buttonIcon} ${iconClasses}`} />
                        Submit Order
                    </button>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    isActiveAwayTeamAdmin: state.awayTeam.admins.indexOf(state.activeUser.id) >= 0,
});

export default connect(
    mapStateToProps,
    {createOrder}
)(NewOrderForm);
