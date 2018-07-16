import * as React from "react";
import {SDKError, initialize} from "../../src/shim";
import RaisedButton from "material-ui/RaisedButton";
import {Tabs, Tab} from "material-ui/Tabs";
import TextField from "material-ui/TextField";
import {logAction} from "../Logger";

export default class InitializeApi extends React.Component {
    passcodeCallback: (passcode) => void;

    constructor(props) {
        super(props);
        this.state = {
            showSetPasscode: false,
            passcode: "",
        };
    }

    onPasscodeChange = (event) => {
        this.setState({
            passcode: event.currentTarget.value,
        });
    };

    handleEnter = (event) => {
        if (event.charCode === 13) {
            this.setPasscode();
        }
    };

    setPasscode = () => {
        if (this.state.passcode && this.passcodeCallback) {
            this.passcodeCallback(this.state.passcode);
        }
    };

    generateJWT() {
        return fetch(`/generateJWT/${window.User.id}`)
            .then((response) => response.json())
            .then((jwt) => {
                logAction(`Got JWT token: ${jwt}`);
                return jwt;
            })
            .catch((error) => {
                logAction(`Failed to get JWT token: ${error.messsage}`, "error");
                return error;
            });
    }

    getUsersPasscode = (didUserExist) => {
        if (didUserExist) {
            logAction(`User exists, but no local keys. Need passcode in order to unlock user key to generate device/signing/transform key`);
        } else {
            logAction(`User doesn't exist. Need passcode to encrypt users private key before we create the user.`);
        }
        this.setState({showSetPasscode: true});
        //We need the users passcode so return a new Promise and store off the resolve function. We'll invoke it later once we have
        //the users passcode value.
        return new Promise((resolve) => {
            this.passcodeCallback = resolve;
        });
    };

    initialize = () => {
        logAction(`Calling SDK Init`);
        initialize(this.generateJWT, this.getUsersPasscode)
            .then((initializedResult) => {
                document.cookie = `integrationDemo=${JSON.stringify({id: window.User.id, name: window.User.name})};`;
                logAction(`Init complete. Initialized user ${initializedResult.user.id} who has status ${initializedResult.user.status}`, "success");
                this.props.onComplete();
            })
            .catch((error) => {
                logAction(`Initialize error: ${error.message}. Error Code: ${error.code}`, "error");
            });
    };

    getPasscodeInput() {
        return (
            <TextField
                key="apiPasscode"
                id="api-passcode"
                autoFocus
                type="text"
                hintText="Passcode"
                onChange={this.onPasscodeChange}
                value={this.state.passcode}
            />
        );
    }

    getInitUIElement() {
        if (this.state.showSetPasscode) {
            return [
                this.getPasscodeInput(),
                <RaisedButton className="set-passcode" key="set-passcode" secondary onClick={this.setPasscode} label="Set Passcode" />,
            ];
        }
        return <RaisedButton className="initialize-api-start" secondary onClick={this.initialize} label="Initialize Api" />;
    }

    render() {
        return (
            <Tabs style={{width: "350px"}} className="initialize-api">
                <Tab label="Initialize">
                    <div>{this.getInitUIElement()}</div>
                </Tab>
            </Tabs>
        );
    }
}
