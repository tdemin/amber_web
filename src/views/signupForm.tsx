import React from "react";
import { RouteComponentProps as RCP } from "react-router-dom";

import req from "../axios";

import strings from "./assets/locales";

import "./styles/signupForm.scss";

enum Status {
    FAILED,
    SUCCESS,
    UNDEFINED,
}
interface State {
    name: string;
    password: string;
    status: Status;
}

class SignupForm extends React.PureComponent<RCP, State> {
    state = {
        name: "",
        password: "",
        status: Status.UNDEFINED,
    };
    componentDidUpdate = () => {
        if (this.state.status === Status.SUCCESS) {
            setTimeout(() => {
                this.props.history.push("/");
            }, 5000);
        }
    };
    signup = () => {
        // prettier-ignore
        req.post("/signup", {
            name: this.state.name,
            password: this.state.password,
        })
        .then(
            () => this.setState({ status: Status.SUCCESS }),
            () => this.setState({ status: Status.FAILED })
        );
    };
    goBack = () => this.props.history.push("/");
    updateName = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ name: e.currentTarget.value });
    updatePassword = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ password: e.currentTarget.value });
    render = () => {
        return (
            <div className="container signup_form">
                <form className="signupForm">
                    <div className="field">
                        <label className="label">
                            {strings.login_userNameTp}
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                autoFocus
                                className="input"
                                onChange={this.updateName}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            {strings.login_passwordTp}
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                onChange={this.updatePassword}
                            />
                        </div>
                    </div>
                    <div className="level is-mobile">
                        <div className="level-item level-left">
                            <div className="control">
                                <input
                                    type="button"
                                    className="button"
                                    value={strings.login_signupBtn}
                                    onClick={this.signup}
                                />
                            </div>
                        </div>
                        <div className="level-item level-right">
                            <div className="control">
                                <input
                                    type="button"
                                    className="button"
                                    value={strings.login_goBackBtn}
                                    onClick={this.goBack}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

export default SignupForm;
