import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Store } from "./typings/store";

import LoginForm from "./views/loginForm";
import SignupForm from "./views/signupForm";
import MainView from "./views/mainView";
import EditorView from "./views/editorView";

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
    render = () => {
        const token = this.state.token as string;
        const loggedIn = token.length !== 0;
        return (
            <Router>
                {!loggedIn && (
                    <Switch>
                        <Route path="/signup" exact component={SignupForm} />
                        <Route path="/" exact component={LoginForm} />
                    </Switch>
                )}
                {loggedIn && (
                    <Switch>
                        <Route path="/" exact component={MainView} />
                        <Route path="/task/:id" exact component={EditorView} />
                    </Switch>
                )}
            </Router>
        );
    };
}

export default connect(mapStateToProps)(App);
