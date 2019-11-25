import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Control from "./components/bulma/control";
import Level from "./components/bulma/level";
import TaskList from "./components/taskList";
import Footer from "./components/footer";

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
    updateSearch = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({
            search: e.currentTarget.value,
        });
    toNewTask = () => this.props.history.push("/task/new");
    componentDidMount = () => {
        this.refetch();
        document.addEventListener("keydown", this.handleHotkeys);
    };
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleHotkeys);
    };
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.tasks !== this.props.tasks) {
            this.setState({
                tasks: this.props.tasks,
            });
        }
    };
    handleHotkeys = (e: KeyboardEvent) => {
        const escCode = 27;
        const search = document.getElementById("searchInput");
        const searchFocused = document.activeElement === search;
        if ((e.ctrlKey || e.metaKey) && e.key === "f") {
            e.preventDefault();
            (search as HTMLElement).focus();
        } else if (e.key === "n" && !searchFocused) {
            e.preventDefault();
            this.toNewTask();
        } else if (e.key === "u" && !searchFocused) {
            e.preventDefault();
            this.refetch();
        } else if (e.keyCode === escCode && searchFocused) {
            (document.activeElement as HTMLElement).blur();
            e.preventDefault();
            this.setState({
                search: "",
            });
        }
    };
    render = () => {
        const { username } = this.props;
        const { tasks, search } = this.state;
        return (
            <Container>
                <Level level className="navbar">
                    <Level levelItem levelLeft className="headerText">
                        {`${strings.main_loggedInMsg} ${username}`}
                    </Level>
                    <Level
                        level
                        levelItem
                        levelRight
                        isMobile
                        className="headerButtons"
                    >
                        <Level levelItem>
                            <Button
                                value={strings.btns_addTask}
                                onClick={this.toNewTask}
                            />
                        </Level>
                        <Level levelItem>
                            <Button
                                value={strings.btns_refetch}
                                onClick={this.refetch}
                            />
                        </Level>
                        <Level levelItem>
                            <Button
                                value={strings.btns_pruneTasks}
                                onClick={this.prune}
                            />
                        </Level>
                        <Level levelItem>
                            <Button
                                onClick={this.logout}
                                value={strings.main_logoutBtn}
                            />
                        </Level>
                    </Level>
                </Level>
                <Container>
                    <Control className="searchBox">
                        <Input
                            id="searchInput"
                            placeholder={strings.main_searchTp}
                            onChange={this.updateSearch}
                        />
                    </Control>
                    <TaskList tasks={tasks} search={search}></TaskList>
                </Container>
                <Footer />
            </Container>
        );
    };
}

export default connect(mapStateToProps)(MainView);
