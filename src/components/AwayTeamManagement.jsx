import * as React from "react";
import {connect} from "react-redux";
import Paper from "./Paper";
import AvatarHoverAction from "./AvatarHoverAction";
import {Users, KIRK} from "../Constants";
import {addUserToAwayTeam, removeUserFromAwayTeam} from "../actions/AwayTeamActions";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    header: {textAlign: "center"},
    // section: {display: "flex"},
    // avatarPanel: {
    //     padding: "20px 30px 20px",
    // },
    headerText: {
        fontSize: 20,
        padding: 10,
        textAlign: "center",
    },
    avatarList: {
        width: 400,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(110px, 1fr))",
        "-ms-grid-template-colums": "repeat(auto-fill,minmax(110px, 1fr))",
        "& > div": {margin: 5},
    },
    emptyAvatarList: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        width: 400,
        height: 235,
        border: "3px dashed #ccc",
    },
    flexAlignColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    alignRow: {
        display: "flex",
        justifyContent: "space-around"
    }
});

class AwayTeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loadingUserID: null};
    }

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
                <AvatarHoverAction
                    loading={this.state.loadingUserID === user.id}
                    key={user.id}
                    src={user.img}
                    iconClasses="fas fa-plus"
                    iconColor="#00BCD4"
                    clickAction={() => this.addUser(user)}
                />
            ));
        return <div className={classes.avatarList}>{crewList}</div>;
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
                    <div>Add crew members to the away team.</div>
                </div>
            );
        }
        const awayTeam = this.props.awayTeamMembers
            .filter((user) => user !== KIRK)
            .sort((a, b) => a > b)
            .map((user) => (
                <AvatarHoverAction
                    key={Users[user].id}
                    src={Users[user].img}
                    loading={this.state.loadingUserID === user.id}
                    iconClasses="fas fa-times"
                    iconColor="#D51819"
                    clickAction={() => this.removeUser(Users[user])}
                />
            ));

        return <div className={classes.avatarList}>{awayTeam}</div>;
    }

    render() {
        if (!this.props.isActiveAwayTeamAdmin) {
            return null;
        }
        return (
            <React.Fragment>
                <div className={classes.alignRow}>
                    <Paper>
                        <div>
                            <div className={classes.headerText}>Crew</div>
                            {this.getCrewMemberList()}
                        </div>
                    </Paper>
                    <Paper>
                        <div>
                            <div className={classes.headerText}>Away Team</div>
                            {this.getAwayTeamList()}
                        </div>
                    </Paper>
                </div>
            </React.Fragment>
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
