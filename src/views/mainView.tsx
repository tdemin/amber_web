import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { logout } from "../actions/auth";
import { fetchTasks } from "../actions/tasks";
import { AnyAction } from "../typings/actions";

import strings from "./assets/locales";

import "./styles/mainView.scss";

interface Props {
    dispatch: ThunkDispatch<any, any, AnyAction>;
}
class MainView extends React.PureComponent<Props> {
    logout = () => this.props.dispatch(logout());
    componentDidMount = () => this.props.dispatch(fetchTasks());
    render = () => {
        return (
            <div className="root">
                <span className="loggedInMsg">{strings.main_loggedInMsg}</span>
                <input
                    type="button"
                    className="logoutBtn"
                    onClick={this.logout}
                    value={strings.main_logoutBtn}
                />
            </div>
        );
    };
}

export default connect()(MainView);
