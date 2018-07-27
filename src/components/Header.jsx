import * as React from "react";
import {connect} from "react-redux";
import logo from "../logo-white.svg";
import AvatarHoverAction from "./AvatarHoverAction";
import {Users} from "../Constants";
import {changeActiveUser} from "../actions/UserActions";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    nav: {
        backgroundColor: "#2c2c2c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        color: "#fff",
        fontSize: 26,
        "& > img": {marginRight: 5},
    },
    activeUser: {
        position: "absolute",
        right: 10,
        cursor: "pointer",
        "& > div": {position: "relative"},
    },
    dropdown: {
        minWidth: 280,
        display: "none",
        position: "absolute",
        right: 0,
        color: "#000",
        fontSize: 14,
        backgroundColor: "#fff",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        zIndex: 10,
    },
    dropdownShow: {display: "block"},
    loginText: {
        fontSize: 20,
        padding: "10px 15px",
        color: "#777",
        fontWeight: 400,
    },
    dropdownUser: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 15px",
        borderBottom: "1px solid #ccc",
        textAlign: "right",
        "&:hover": {backgroundColor: "#eee"},
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        textAlign: "left",
    },
    userText: {marginLeft: 15},
    userName: {
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 5,
    },
    userRole: {
        fontSize: 14,
        fontWeight: 400,
        color: "#777",
    },
    chevron: {color: "#ccc"},
});

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            changingUserID: null,
        };
    }

    /**
     * Add background click listener to close dropdown when user clicks outside it.
     */
    componentDidMount() {
        window.addEventListener("click", () => {
            this.setState({dropdownOpen: false});
        });
    }

    /**
     * Display the user selection dropdown.
     */
    showDropdown(event) {
        event.stopPropagation();
        this.setState({dropdownOpen: true});
    }

    /**
     * Click handler for when user is changing who the currently authed user is.
     */
    changeUser(user, event) {
        event.stopPropagation();
        this.setState({changingUserID: user.id});
        this.props.changeActiveUser(user, () => {
            this.setState({dropdownOpen: false, changingUserID: null});
        });
    }

    /**
     * Get a users role text to display next to their avatar in the user list.
     */
    getUserRole(user) {
        if (this.props.awayTeam.admins.indexOf(user.id) > -1) {
            return "Away Team Admin";
        }
        if (this.props.awayTeam.members.indexOf(user.id) > -1) {
            return "Away Team Member";
        }
        return "";
    }

    /**
     * Get markup for user dropdown content.
     */
    getDropDownMarkup() {
        const users = Object.keys(Users)
            .map((user) => Users[user])
            .filter((user) => user.id !== this.props.activeUser.id)
            .sort((a, b) => a.id > b.id);

        const crewList = users.map((user) => (
            <div key={user.id} className={classes.dropdownUser} onClick={this.changeUser.bind(this, user)}>
                <div className={classes.userInfo}>
                    <AvatarHoverAction src={user.img} size={60} loading={this.state.changingUserID === user.id} iconColor="#00BCD4" />
                    <div className={classes.userText}>
                        <div className={classes.userName}>{user.name}</div>
                        <div className={classes.userRole}>{this.getUserRole(user)}</div>
                    </div>
                </div>
                <div className={classes.chevron}>
                    <i className="fas fa-chevron-right fa-2x" />
                </div>
            </div>
        ));

        return (
            <React.Fragment>
                <div className={classes.loginText}>Login As: </div>
                {crewList}
            </React.Fragment>
        );
    }

    render() {
        return (
            <header className={classes.nav}>
                <img src={logo} height="70" width="70" alt="" />
                <span>IronCore Get Started</span>
                <div className={classes.activeUser} onClick={this.showDropdown.bind(this)}>
                    <div>
                        <AvatarHoverAction src={this.props.activeUser.img} size={80} />
                        <div className={`${classes.dropdown} ${this.state.dropdownOpen ? classes.dropdownShow : ""}`}>{this.getDropDownMarkup()}</div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    activeUser: state.activeUser,
    awayTeam: state.awayTeam,
});

export default connect(
    mapStateToProps,
    {changeActiveUser}
)(Header);
