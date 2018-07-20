import * as React from "react";
import {connect} from "react-redux";
import logo from "../logo.svg";
import AvatarImage from "./AvatarImage";
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
        minWidth: 180,
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
    dropdownUser: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 15px",
        borderBottom: "1px solid #ccc",
        textAlign: "right",
        "&:hover": {backgroundColor: "#eee"},
    },
    userName: {fontWeight: "bold", fontSize: 16, marginBottom: 5},
});

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
        };
    }

    componentDidMount() {
        window.addEventListener("click", () => {
            this.setState({dropdownOpen: false});
        });
    }

    toggleDropdown(event) {
        event.stopPropagation();
        this.setState({dropdownOpen: true});
    }

    changeUser(user, event) {
        event.stopPropagation();
        this.setState({dropdownOpen: false});
        this.props.changeActiveUser(user);
    }

    getUserRole(user) {
        if (this.props.awayTeamGroup.admins[user.id]) {
            return "Away Team Admin";
        }
        if (this.props.awayTeamGroup.members[user.id]) {
            return "Away Team Member";
        }
        return "";
    }

    getDropDownMarkup() {
        const users = Object.keys(Users)
            .map((user) => Users[user])
            .filter((user) => user.id !== this.props.activeUser.id)
            .sort((a, b) => a.id > b.id);

        return users.map((user) => (
            <div key={user.id} className={classes.dropdownUser} onClick={this.changeUser.bind(this, user)}>
                <AvatarImage src={user.img} size={60} />
                <div>
                    <div className={classes.userName}>{user.name}</div>
                    {this.getUserRole(user)}
                </div>
            </div>
        ));
    }

    render() {
        return (
            <header className={classes.nav}>
                <img src={logo} height="70" width="70" alt="" />
                <span>IronCore Get Started</span>
                <div className={classes.activeUser} onClick={this.toggleDropdown.bind(this)}>
                    <div>
                        <AvatarImage src={this.props.activeUser.img} />
                        <div className={`${classes.dropdown} ${this.state.dropdownOpen ? classes.dropdownShow : ""}`}>{this.getDropDownMarkup()}</div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    activeUser: state.activeUser,
    awayTeamGroup: state.awayTeamGroup,
});

export default connect(
    mapStateToProps,
    {changeActiveUser}
)(Header);
