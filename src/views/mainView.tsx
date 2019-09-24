import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import TaskList from "./components/taskList";

import { logout } from "../actions/auth";
import { refetchTasks, deleteTask } from "../actions/tasks";
import { AnyAction } from "../typings/actions";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";

import strings from "./assets/locales";

import "./styles/mainView.scss";

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
    username: state.auth.username,
});

interface Props extends RouteComponentProps {
    dispatch: ThunkDispatch<any, any, AnyAction>;
    tasks: Task[];
    username?: string;
}
interface State {
    tasks: Task[];
    search: string;
}
class MainView extends React.Component<Props, State> {
    state = {
        tasks: this.props.tasks,
        search: "",
    };
    logout = () => this.props.dispatch(logout());
    refetch = () => this.props.dispatch(refetchTasks(this.props.tasks));
    prune = () => {
        const danglingTasks = this.state.tasks.filter(
            (task) =>
                this.state.tasks.filter((child) => child.PID === task.ID)
                    .length === 0 && task.Completed
        );
        danglingTasks.forEach((task) => this.props.dispatch(deleteTask(task)));
    };
    updateSearch = (event: React.FormEvent<HTMLInputElement>) =>
        this.setState({
            search: event.currentTarget.value,
        });
    toNewTask = () => this.props.history.push("/task/new");
    componentDidMount = () => this.refetch();
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.tasks !== this.props.tasks) {
            this.setState({
                tasks: this.props.tasks,
            });
        }
    };
    render = () => {
        const { username } = this.props;
        const { tasks, search } = this.state;
        return (
            <div className="root container">
                <div className="navbar level">
                    <div className="headerText level-left level-item">
                        {`${strings.main_loggedInMsg} ${username}`}
                    </div>
                    {/* eslint-disable-next-line max-len */}
                    <div className="headerButtons level-right level-item level is-mobile">
                        <input
                            type="button"
                            className="addBtn button level-item"
                            value={strings.btns_addTask}
                            onClick={this.toNewTask}
                        />
                        <input
                            type="button"
                            className="refetchBtn button level-item"
                            onClick={this.refetch}
                            value={strings.btns_refetch}
                        />
                        <input
                            type="button"
                            className="pruneBtn button level-item"
                            onClick={this.prune}
                            value={strings.btns_pruneTasks}
                        />
                        <input
                            type="button"
                            className="logoutBtn button level-item"
                            onClick={this.logout}
                            value={strings.main_logoutBtn}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="field searchBox">
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder={strings.main_searchTp}
                                autoFocus
                                onChange={this.updateSearch}
                            />
                        </div>
                    </div>
                    <TaskList tasks={tasks} search={search}></TaskList>
                </div>
                <div className="app_footer">
                    <div className="level">
                        <span className="level-item text">
                            {strings.app_versionString}
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(MainView);
