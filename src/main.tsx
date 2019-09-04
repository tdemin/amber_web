import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Store } from "./typings/store";

import LoginForm from "./views/loginForm";
import MainView from "./views/mainView";

import { setToken, resetToken } from "./actions/auth";

const mapStateToProps = (state: Store) => ({
    token: state.auth.token,
    username: state.auth.username,
});

interface Props {
    token?: string;
    username?: string;
}
class App extends React.Component<Props, Props> {
    state = {
        token: this.props.token,
        username: this.props.username,
    } as Props;
    updateToken = () => {
        if (this.props.token) setToken(this.props.token as string);
        else resetToken();
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
    render = () => {
        const token = this.state.token as string;
        const loggedIn = token.length !== 0;
        return (
            <div className="app">
                <Router>
                    {!loggedIn && (
                        <Switch>
                            <Route path="/" exact component={LoginForm} />
                        </Switch>
                    )}
                    {loggedIn && (
                        <Switch>
                            <Route path="/" exact component={MainView} />
                        </Switch>
                    )}
                </Router>
            </div>
        );
    };
}

export default connect(mapStateToProps)(App);
