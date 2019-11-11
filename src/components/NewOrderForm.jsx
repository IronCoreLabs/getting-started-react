import * as React from "react";
import {connect} from "react-redux";
import {createOrder} from "../actions/OrderActions";
import showSnackbar from "../lib/Snackbar";
import {stylesListToClassNames} from "../lib/Utils";
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
    orderHeader: {
        borderBottom: "1px solid #D9D9D9",
        display: "flex",
        fontSize: 18,
        margin: "10px 0",
        padding: "7px 0",
        "& :first-of-type(div)": {
            fontWeight: "bold",
            padding: "0 7px",
            width: 60,
        },
    },
    genericInput: {
        border: "1px solid #D9D9D9",
        borderLeft: "3px solid #F44336",
        display: "block",
        fontSize: 18,
        margin: "15px 0",
        outline: "none",
        padding: 7,
        width: "85%",
    },
    button: {
        background: "#0ABFD6",
        border: "1px solid #FFF",
        borderRadius: 3,
        color: "#FFF",
        fontWeight: "light",
        fontSize: 16,
        letterSpacing: ".05em",
        outline: "none",
        padding: "15px 30px",
        textAlign: "center",
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
        const iconClasses = this.state.savingOrder ? "fas fa-spinner fa-spin" : "";
        return (
            <React.Fragment>
                <h3 className={classes.headerText}>Encrypt an order to the away-team:</h3>
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
                        placeholder="Your Order Title..."
                        value={this.state.orderTitle}
                        onChange={this.updateOrderTitle.bind(this)}
                    />
                    <textarea
                        className={`${classes.textarea} ${classes.genericInput}`}
                        placeholder="Your order to encrypt..."
                        rows={6}
                        onChange={this.updateOrderBody.bind(this)}
                        value={this.state.orderBody}
                    />
                    <button className={classes.button} onClick={this.submitNewOrder.bind(this)}>
                        <i className={`${classes.buttonIcon} ${iconClasses}`} />
                        Encrypt your order
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
