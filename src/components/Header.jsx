import * as React from "react";
import { connect } from "react-redux";
import logo from "../logo-black.svg";
import AvatarHoverAction from "./AvatarHoverAction";
import AwayTeamManagement from "../components/AwayTeamManagement";
import { Users } from "../Constants";
import { changeActiveUser } from "../actions/UserActions";
import { stylesListToClassNames } from "../lib/Utils";

const classes = stylesListToClassNames({
    nav: {
        alignItems: "center",
        borderBottom: ".5px solid #CCC",
        color: "#8F8F8F",
        display: "flex",
        fontWeight: 400,
        justifyContent: "space-between",
        padding: "10px 30px",
    },
    activeUser: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    },
    dropdown: {
        backgroundColor: "#FFF",
        borderRadius: 2,
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50), 0 6px 10px 0 rgba(0,0,0,0.23), 0 10px 30px 0 rgba(0,0,0,0.19)",
        display: "none",
        padding: "20px 20px 0px 20px",
        position: "absolute",
        right: 20,
        top: "65px !important",
        width: 320,
        zIndex: 30,
    },
    dropdownShow: { display: "block !important" },
    loginText: {
        color: "#929292",
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 15,
    },
    dropdownUser: {
        alignItems: "center",
        borderBottom: "1px solid rgba(151, 151, 151, .15)",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "-20px",
        padding: "7px 15px",
        textAlign: "right",
        width: "calc(100% + 10px)",
        "&:hover": { backgroundColor: "#EEE" },
    },
    userInfo: {
        alignItems: "center",
        display: "flex",
        textAlign: "left",
    },
    userText: { marginLeft: 20 },
    userRole: {
        color: "#929292",
        fontWeight: "bold",
        fontSize: 12,
        letterSpacing: ".02em",
        paddingTop: 5,
    },
    chevron: { color: "#CCC" },
    titleContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

    },
    ironTitle: {
        color: "black",
        fontWeight: "bold",
        marginLeft: 10,
        paddingRight: 10,
        textTransform: "uppercase",
    },
    userDescription: {
        marginRight: 15,
        textAlign: "right"
    },
    activeUserName: {
        color: "#000",
        fontWeight: "bold",
        letterSpacing: "-0.14px",
        textAlign: "right",
    },
    userName: {
        color: "#000",
        fontSize: 14,
    },
    actingAs: {
        color: "#BDBDBD",
        fontSize: 14,
        letterSpacing: "-0.14px",
        marginBottom: 5,
        textAlign: "right",
    },
    rightSection: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    }
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
            this.setState({ dropdownOpen: false });
        });
    }

    /**
     * Display the user selection dropdown.
     */
    showDropdown(event) {
        console.log(event)
        event.stopPropagation();
        this.setState({ dropdownOpen: true });
    }

    /**
     * Click handler for when user is changing who the currently authed user is.
     */
    changeUser(user, event) {
        event.stopPropagation();
        this.setState({ changingUserID: user.id });
        this.props.changeActiveUser(user, () => {
            this.setState({ dropdownOpen: false, changingUserID: null });
        });
    }

    /**
     * Get a users role text to display next to their avatar in the user list.
     */
    getUserRole(user) {
        if (this.props.awayTeam.admins.indexOf(user.id) > -1) {
            return "Away-Team Admin";
        }
        if (this.props.awayTeam.members.indexOf(user.id) > -1) {
            return "Away-Team";
        }
        return "Starship Enterprise";
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
                    <AvatarHoverAction src={user.img} size={45} loading={this.state.changingUserID === user.id} iconColor="#00BCD4" />
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
                <div className={classes.loginText}>Login As:</div>
                {crewList}
            </React.Fragment>
        );
    }

    render() {
        return (
            <header className={classes.nav}>
                <div className={classes.titleContainer}>
                    <img src={logo} height="40" width="40" alt="" />
                    <h1 className={classes.ironTitle}>Iron</h1>
                    <h1>React</h1>
                </div>
                <div className={classes.rightSection}>
                    <AwayTeamManagement />
                    <div className={classes.activeUser} onClick={this.showDropdown.bind(this)}>
                        <div className={classes.userDescription}>
                            <p className={classes.actingAs}>Acting as:</p>
                            <p className={classes.activeUserName}>  {this.props.activeUser.name}</p>
                        </div>
                        <AvatarHoverAction src={this.props.activeUser.img} size={40} />
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
    { changeActiveUser }
)(Header);
