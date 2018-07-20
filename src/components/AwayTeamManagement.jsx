import * as React from "react";
import {connect} from "react-redux";
import Paper from "./Paper";
import AvatarHoverAction from "./AvatarHoverAction";
import {Users, KIRK} from "../Constants";
import {addMemberToAwayTeamGroup, removeMemberFromAwayTeamGroup} from "../actions/AwayTeamGroupActions";
import {stylesListToClassNames} from "../lib/Utils";

const classes = stylesListToClassNames({
    header: {textAlign: "center"},
    section: {display: "flex"},
    avatarPanel: {
        padding: "20px 30px 20px",
    },
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
});

class AwayTeamManagement extends React.Component {
    getCrewMemberList() {
        const crewList = Object.keys(Users)
            .map((userID) => Users[userID])
            //Don't display users who are within the away-team group and also don't display Kirk as he's already the away team admin
            .filter((user) => this.props.awayTeamMembers.indexOf(user.id) === -1 && user.id !== KIRK)
            .sort((a, b) => a.id > b.id)
            .map((user) => (
                <AvatarHoverAction
                    key={user.id}
                    src={user.img}
                    iconClasses="fas fa-plus"
                    iconColor="#00BCD4"
                    clickAction={() => this.props.addMemberToAwayTeamGroup(user)}
                />
            ));
        return <div className={classes.avatarList}>{crewList}</div>;
    }

    getEmptyAwayTeamBox() {
        return (
            <div className={classes.emptyAvatarList}>
                <div>Add crew members to the away team</div>
            </div>
        );
    }

    getAwayTeamList() {
        const awayTeam = this.props.awayTeamMembers
            .sort((a, b) => a > b)
            .map((user) => (
                <AvatarHoverAction
                    key={Users[user].id}
                    src={Users[user].img}
                    iconClasses="fas fa-times"
                    iconColor="#D51819"
                    clickAction={() => this.props.removeMemberFromAwayTeamGroup(Users[user])}
                />
            ));
        if (awayTeam.length === 0) {
            return this.getEmptyAwayTeamBox();
        }
        return <div className={classes.avatarList}>{awayTeam}</div>;
    }

    render() {
        if (!this.props.isActiveUserGroupAdmin) {
            return null;
        }
        return (
            <div>
                <h2 className={classes.header}>Manage Away Team</h2>
                <div className={classes.section}>
                    <div className={classes.avatarPanel}>
                        <Paper>
                            <div className={classes.headerText}>Crew</div>
                            {this.getCrewMemberList()}
                        </Paper>
                    </div>
                    <div className={classes.avatarPanel}>
                        <Paper>
                            <div className={classes.headerText}>Away Team</div>
                            {this.getAwayTeamList()}
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isActiveUserGroupAdmin: state.awayTeamGroup.admins.indexOf(state.activeUser.id) >= 0,
    awayTeamMembers: state.awayTeamGroup.members,
});

export default connect(
    mapStateToProps,
    {addMemberToAwayTeamGroup, removeMemberFromAwayTeamGroup}
)(AwayTeamManagement);
