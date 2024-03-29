import React from "react";
import { RouteComponentProps as RCP } from "react-router-dom";
import { AxiosError } from "axios";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Control from "./components/bulma/control";
import Level from "./components/bulma/level";
import Field from "./components/bulma/field";
import Message from "./components/message";

import strings from "./assets/locales";
import { signup as callAPISignup } from "../actions/auth";

const successRedirectDelay = 5000;

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
                this.goBack();
            }, successRedirectDelay);
        }
    };
    signup = () => {
        this.setState({ status: Status.IN_PROCESS });
        callAPISignup(
            this.state.name,
            this.state.password,
            () => this.setState({ status: Status.SUCCESS }),
            (e: AxiosError) => {
                if (e.response) {
                    this.setState({
                        status: Status.FAILED,
                        httpCode: e.response?.status,
                    });
                } else {
                    // fallback for possible CORS errors
                    this.setState({
                        status: Status.FAILED,
                        httpCode: Errors.FORBIDDEN,
                    });
                }
            }
        );
    };
    goBack = () => this.props.history.push("/");
    updateName = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ name: e.currentTarget.value });
    updatePassword = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({ password: e.currentTarget.value });
    render = () => {
        let msg: string;
        switch (this.state.httpCode) {
            case Errors.FORBIDDEN:
                msg = strings.signup_disabled;
                break;
            case Errors.USER_EXISTS:
                msg = strings.signup_userExists;
                break;
            default:
                msg = strings.signup_unknownError;
        }
        return (
            <Container>
                <form className="signupForm">
                    <Field
                        label={strings.login_userNameTp}
                        control={<Input autoFocus onChange={this.updateName} />}
                    />
                    <Field
                        label={strings.login_passwordTp}
                        control={
                            <Input password onChange={this.updatePassword} />
                        }
                    />
                    <Level level isMobile>
                        <Level levelItem levelLeft>
                            <Control>
                                <Button
                                    value={strings.login_signupBtn}
                                    onClick={this.signup}
                                />
                            </Control>
                        </Level>
                        <Level levelItem>
                            <Message
                                condition={this.state.status === Status.FAILED}
                                message={`${strings.signup_failMsg}: ${msg}`}
                            />
                            <Message
                                condition={
                                    this.state.status === Status.IN_PROCESS
                                }
                                message={strings.signup_processMsg}
                            />
                            <Message
                                condition={this.state.status === Status.SUCCESS}
                                message={strings.signup_successMsg}
                            />
                        </Level>
                        <Level levelItem levelRight>
                            <Control>
                                <Button
                                    value={strings.login_goBackBtn}
                                    onClick={this.goBack}
                                />
                            </Control>
                        </Level>
                    </Level>
                </form>
            </Container>
        );
    };
}

export default SignupForm;
