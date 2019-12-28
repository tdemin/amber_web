import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Control from "./components/bulma/control";
import Field from "./components/bulma/field";
import Level from "./components/bulma/level";
import Message from "./components/message";

import { login } from "../actions/auth";
import { getServerVersion } from "../actions/misc";
import { AuthAction } from "../typings/actions";
import { Store } from "../typings/store";

import strings from "./assets/locales";

const mapStateToProps = (state: Store) => ({
    loginFailed: state.auth.loginFailed,
});

// applies to the state as well
interface State {
    username: string;
    password: string;
    loginFailed: boolean;
    signupEnabled: boolean;
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
        signupEnabled: false,
    } as State;
    componentDidMount = async () => {
        let versionData = await getServerVersion();
        this.setState({ signupEnabled: versionData.signup });
    };
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.loginFailed !== this.props.loginFailed) {
            this.setState({ loginFailed: this.props.loginFailed as boolean });
        }
    };
    updateUserName = (event: React.FormEvent<HTMLInputElement>) =>
        this.setState({ username: event.currentTarget.value });
    updatePassword = (event: React.FormEvent<HTMLInputElement>) =>
        this.setState({ password: event.currentTarget.value });
    login = () =>
        this.props.dispatch(login(this.state.username, this.state.password));
    toSignup = () => this.props.history.push("/signup");
    onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        event.key === "Enter" && this.login();
    };
    render = () => (
        <Container onKeyPress={this.onKeyPress}>
            <form className="loginForm">
                <Field label={strings.login_userNameTp}>
                    <Input autoFocus onChange={this.updateUserName} />
                </Field>
                <Field label={strings.login_passwordTp}>
                    <Input password onChange={this.updatePassword} />
                </Field>
                <Message
                    condition={this.state.loginFailed}
                    message={strings.login_wrongPassTp}
                />
                <Level level isMobile>
                    <Level levelItem levelLeft>
                        <Control>
                            <Button
                                onClick={this.login}
                                value={strings.login_loginBtn}
                            />
                        </Control>
                    </Level>
                    <Level levelItem levelRight>
                        <Control>
                            <Button
                                disabled={!this.state.signupEnabled}
                                onClick={this.toSignup}
                                value={strings.login_signupBtn}
                            />
                        </Control>
                    </Level>
                </Level>
            </form>
        </Container>
    );
}

export default connect(mapStateToProps)(LoginForm);
