import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import req from "./axios";

import { Store } from "./typings/store";
import { Dispatch } from "./typings/react";
import { HTTPSuccessCode } from "./typings/api";

import LoginForm from "./views/loginForm";
import SignupForm from "./views/signupForm";
import MainView from "./views/mainView";
import EditorView from "./views/editorView";
import AboutView from "./views/aboutView";

import { setToken, resetToken, localLogout } from "./actions/auth";

import "./views/styles/common.scss";

const mapStateToProps = (state: Store) => ({
    token: state.auth.token,
    username: state.auth.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(localLogout()),
});

interface Props extends ReturnType<typeof mapDispatchToProps> {
    token?: string;
    username?: string;
}
class App extends React.Component<Props, Props> {
    state = {
        token: this.props.token,
        username: this.props.username,
    } as Props;
    updateToken = () => {
        if (this.props.token) {
            setToken(this.props.token as string);
        } else {
            resetToken();
        }
    };
    UNSAFE_componentWillMount = () => this.updateToken();
    componentDidUpdate = (prevProps: Props) => {
        if (
            prevProps.token !== this.props.token ||
            prevProps.username !== this.props.username
        ) {
            this.updateToken();
            this.setState({
                token: this.props.token,
                username: this.props.username,
            });
        }
    };
    componentDidMount = () => {
        if (this.props.token) {
            req.head("/session").then((res) => {
                if (res.status !== HTTPSuccessCode) {
                    this.props.logout();
                }
            });
        }
    };
    render = () => {
        const loggedIn = (this.state.token as string).length !== 0;
        return (
            <Router>
                {!loggedIn && (
                    <Switch>
                        <Route path="/signup" exact component={SignupForm} />
                        <Route path="/" exact component={LoginForm} />
                        <Route path="/about" exact component={AboutView} />
                    </Switch>
                )}
                {loggedIn && (
                    <Switch>
                        <Route path="/" exact component={MainView} />
                        <Route path="/task/:id" exact component={EditorView} />
                        <Route path="/about" exact component={AboutView} />
                    </Switch>
                )}
            </Router>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
