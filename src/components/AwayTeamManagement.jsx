import * as React from "react";
import {connect} from "react-redux";
import AvatarHoverAction from "./AvatarHoverAction";
import {Users, KIRK} from "../Constants";
import {addUserToAwayTeam, removeUserFromAwayTeam} from "../actions/AwayTeamActions";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    header: {
        alignItems: "center",
        backgroundColor: "#F6F8FA",
        display: "flex",
        flexDirection: "row",
        fontSize: 28,
        justifyContent: "space-between",
        left: 0,
        padding: 22,
        top: 0,
    },
    section: {padding: 22},
    mainHeaderText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: "24px",
        marginBottom: "5px",
    },
    headerText: {
        color: "#929292",
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 20,
    },
    emptyAvatarList: {
        alignItems: "center",
        border: "2px dashed #ccc",
        color: "#929292",
        display: "flex",
        fontSize: 14,
        height: 40,
        justifyContent: "center",
        marginTop: 20,
    },
    sideBar: {
        background: "#FFF",
        boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.50)",
        display: "none",
        height: "100vh",
        maxWidth: 430,
        minWidth: 300,
        position: "fixed",
        left: 0,
        top: 0,
        width: "50%",
        zIndex: 20,
    },
    menuOpen: {display: "block"},
    userRow: {
        alignItems: "center",
        borderBottom: "1px solid #F2F2F2",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "0 -22px",
        padding: "8px 22px",
    },
    userLeft: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
    },
    userDescription: {
        paddingLeft: 20,
    },
    userName: {
        color: "#000",
        fontSize: 16,
        paddingBottom: 4,
    },
    userRole: {
        color: "#929292",
        fontWeight: "bold",
        fontSize: 14,
    },
    toggleMenuButton: {
        color: "#0ABFD6",
        cursor: "pointer",
        fontSize: 12,
        letterSpacing: ".05em",
        // marginRight: 30,
        textAlign: "right",
        textTransform: "uppercase",
    },
});

class AwayTeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            loadingUserID: null,
        };
    }

    /**
     * Open or close away team management menu based on menuOpen state
     */
    toggleMenuOpen = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    };

    /**
     * Kick off action to add the provided user to the away team
     */
    addUser(user) {
        this.setState({loadingUserID: user.id});
        const clearLoading = () => this.setState({loadingUserID: null});
        this.props.addUserToAwayTeam(user, clearLoading, clearLoading);
    }

    /**
     * Kick off action to removed the provided user from the away team
     */
    removeUser(user) {
        this.setState({loadingUserID: user.id});
        const clearLoading = () => this.setState({loadingUserID: null});
        this.props.removeUserFromAwayTeam(user, clearLoading, clearLoading);
    }

    /**
     * Get markup for the list of users who are not in the away team
     */
    getCrewMemberList() {
        const crewList = Object.keys(Users)
            .map((userID) => Users[userID])
            //Don't display users who are within the away-team and also don't display Kirk as he's already the away team admin
            .filter((user) => this.props.awayTeamMembers.indexOf(user.id) === -1 && user.id !== KIRK)
            .sort((a, b) => a.id > b.id)
            .map((user) => (
                <div className={classes.userRow} onClick={() => this.addUser(user)} key={user.id}>
                    <div className={classes.userLeft}>
                        <AvatarHoverAction loading={this.state.loadingUserID === user.id} src={user.img} size={40} />
                        <div className={classes.userDescription}>
                            <p className={classes.userName}>{user.name}</p>
                            <p className={classes.userRole}>Starship Enterprise</p>
                        </div>
                    </div>
                    <i className="fas fa-plus" />
                </div>
            ));
        return <div>{crewList}</div>;
    }

    /**
     * Get markup for the list of users are are in the away team
     */
    getAwayTeamList() {
        //Since Kirk is always a member of the away team, check if the length is only 1 which means
        //no other crew members are in the list
        if (this.props.awayTeamMembers.length === 1) {
            return (
                <div className={classes.emptyAvatarList}>
                    <div>Add crew members to the away-team.</div>
                </div>
            );
        }
        const awayTeam = this.props.awayTeamMembers
            .filter((user) => user !== KIRK)
            .sort((a, b) => a > b)
            .map((user) => (
                <div className={classes.userRow} onClick={() => this.removeUser(Users[user])} key={Users[user].id}>
                    <div className={classes.userLeft}>
                        <AvatarHoverAction
                            src={Users[user].img}
                            loading={this.state.loadingUserID === user.id}
                            clickAction={() => this.removeUser(Users[user])}
                            size={40}
                        />
                        <div className={classes.userDescription}>
                            <p className={classes.userName}>{Users[user].name}</p>
                            <p className={classes.userRole}>Away-team Group</p>
                        </div>
                    </div>
                    <i className="fas fa-times" />
                </div>
            ));
        return awayTeam;
    }

    getMenuMarkup() {
        return (
            <div className={`${classes.sideBar} ${this.state.menuOpen ? classes.menuOpen : ""}`}>
                <div className={classes.header}>
                    <h2 className={classes.mainHeaderText}>Away Team Management</h2>
                    <div onClick={() => this.toggleMenuOpen()}>
                        <i className="fas fa-times" />
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.headerText}>Away-Team Group Members</div>
                    {this.getAwayTeamList()}
                    <div className={classes.headerText}>Starship Enterprise Crew</div>
                    {this.getCrewMemberList()}
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.isActiveAwayTeamAdmin) {
            return null;
        }
        return (
            <div>
                <h3 onClick={() => this.toggleMenuOpen()} className={classes.toggleMenuButton}>
                    Manage Away Team
                </h3>
                {this.state.menuOpen ? this.getMenuMarkup() : ""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isActiveAwayTeamAdmin: state.awayTeam.admins.indexOf(state.activeUser.id) >= 0,
    awayTeamMembers: state.awayTeam.members,
});

export default connect(
    mapStateToProps,
    {addUserToAwayTeam, removeUserFromAwayTeam}
)(AwayTeamManagement);
