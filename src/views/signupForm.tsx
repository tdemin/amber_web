import React from "react";
import { RouteComponentProps as RCP } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import req from "../axios";

import strings from "./assets/locales";

import "./styles/signupForm.scss";

enum Status {
    UNDEFINED,
    FAILED,
    SUCCESS,
    IN_PROCESS,
}
enum Errors {
    FORBIDDEN = 403,
    USER_EXISTS = 409,
}
interface State {
    name: string;
    password: string;
    status: Status;
    httpCode: number;
}

interface MsgProps {
    message: string;
    code: Status;
    matchCode: Status;
}
/**
 * Used for displaying messages on matching status code.
 */
const Msg: React.FC<MsgProps> = (props) => (
    <span
        style={{ display: props.code === props.matchCode ? "block" : "none" }}
    >
        {props.message}
    </span>
);

class SignupForm extends React.PureComponent<RCP, State> {
    state = {
        name: "",
        password: "",
        status: Status.UNDEFINED,
        httpCode: 0,
    };
    componentDidUpdate = () => {
        if (this.state.status === Status.SUCCESS) {
            setTimeout(() => {
                this.props.history.push("/");
            }, 5000);
        }
    };
    signup = () => {
        this.setState({ status: Status.IN_PROCESS });
        // prettier-ignore
        req.post("/signup", {
            name: this.state.name,
            password: this.state.password,
        })
        .then(
            () => this.setState({ status: Status.SUCCESS }),
            (e: AxiosError) => this.setState({
                status: Status.FAILED,
                httpCode: (e.response as AxiosResponse).status
            })
        );
    };
    goBack = () => this.props.history.push("/");
    updateName = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ name: e.currentTarget.value });
    updatePassword = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ password: e.currentTarget.value });
    render = () => {
        let message: string;
        switch (this.state.httpCode) {
            case Errors.FORBIDDEN:
                message = strings.signup_disabled;
            case Errors.USER_EXISTS:
                message = strings.signup_userExists;
            default:
                message = strings.signup_unknownError;
        }
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
                        <div className="level-item">
                            <Msg
                                code={this.state.status}
                                matchCode={Status.FAILED}
                                message={`${strings.signup_failMsg}: ${message}`}
                            />
                            <Msg
                                code={this.state.status}
                                matchCode={Status.IN_PROCESS}
                                message={strings.signup_processMsg}
                            />
                            <Msg
                                code={this.state.status}
                                matchCode={Status.SUCCESS}
                                message={strings.signup_successMsg}
                            />
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
