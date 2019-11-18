import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Button } from "./components/bulma/button";
import { Input } from "./components/bulma/input";
import { Control } from "./components/bulma/control";
import { Field } from "./components/bulma/field";

import { login } from "../actions/auth";
import { AuthAction } from "../typings/actions";
import { Store } from "../typings/store";

import strings from "./assets/locales";

import "./styles/loginForm.scss";

const mapStateToProps = (state: Store) => ({
    loginFailed: state.auth.loginFailed,
});

// applies to the state as well
interface State {
    username: string;
    password: string;
    loginFailed: boolean;
}
interface Props extends RouteComponentProps {
    loginFailed?: boolean;
    dispatch: ThunkDispatch<any, any, AuthAction>;
}
class LoginForm extends React.PureComponent<Props, State> {
    state = {
        username: "",
        password: "",
        loginFailed: this.props.loginFailed,
    } as State;
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.loginFailed !== this.props.loginFailed)
            this.setState({ loginFailed: this.props.loginFailed as boolean });
    };
    updateUserName = (event: React.FormEvent<HTMLInputElement>) =>
        this.setState({ username: event.currentTarget.value });
    updatePassword = (event: React.FormEvent<HTMLInputElement>) =>
        this.setState({ password: event.currentTarget.value });
    login = () =>
        this.props.dispatch(login(this.state.username, this.state.password));
    toSignup = () => this.props.history.push("/signup");
    onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") this.login();
    };
    render = () => (
        <div className="container login_view">
            <form className="loginForm" onKeyPress={this.onKeyPress}>
                <div className="field">
                    <label className="label">{strings.login_userNameTp}</label>
                    <div className="control">
                        <Input autoFocus onChange={this.updateUserName} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">{strings.login_passwordTp}</label>
                    <div className="control">
                        <Input password onChange={this.updatePassword} />
                    </div>
                </div>
                <span
                    className="wrongPassTooltip"
                    style={{
                        display: this.state.loginFailed ? "block" : "none",
                    }}
                >
                    {strings.login_wrongPassTp}
                </span>
                <div className="level is-mobile">
                    <div className="level-item level-left">
                        <div className="control">
                            <input
                                type="button"
                                className="button"
                                value={strings.login_loginBtn}
                                onClick={this.login}
                            />
                        </div>
                    </div>
                    <div className="level-item level-right">
                        <div className="control">
                            <input
                                type="button"
                                className="button"
                                onClick={this.toSignup}
                                value={strings.login_signupBtn}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default connect(mapStateToProps)(LoginForm);
