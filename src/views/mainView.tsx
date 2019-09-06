import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import TaskList from "./components/taskList";

import { logout } from "../actions/auth";
import { fetchTasks } from "../actions/tasks";
import { AnyAction } from "../typings/actions";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";

import strings from "./assets/locales";

import "./styles/mainView.scss";

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
    username: state.auth.username,
});

interface Props {
    dispatch: ThunkDispatch<any, any, AnyAction>;
    tasks: Task[];
    username?: string;
}
class MainView extends React.PureComponent<Props> {
    logout = () => this.props.dispatch(logout());
    componentDidMount = () => this.props.dispatch(fetchTasks());
    render = () => {
        const { tasks, username } = this.props;
        return (
            <div className="root">
                <div className="header">
                    <span className="loggedInMsg">
                        {strings.main_loggedInMsg}
                        <span className="userName">{username}</span>
                    </span>
                    <input
                        type="button"
                        className="logoutBtn"
                        onClick={this.logout}
                        value={strings.main_logoutBtn}
                    />
                </div>
                <div className="main">
                    <TaskList tasks={tasks}></TaskList>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(MainView);
