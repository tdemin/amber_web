import React from "react";
import { connect } from "react-redux";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Control from "./components/bulma/control";
import Level from "./components/bulma/level";
import TaskList from "./components/taskList";
import Footer from "./components/footer";

import { logout } from "../actions/auth";
import { refetchTasks, deleteTask } from "../actions/tasks";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";
import { Dispatch, RCPWithDispProps } from "../typings/react";

import { uiDelay } from "../const";
import { hotkeyHandler, escCode } from "./helpers/keyboard";
import strings from "./assets/locales";

const generateHotkeyHandler = (view: MainView) => (e: KeyboardEvent) => {
    const search = document.getElementById("searchInput") as HTMLElement;
    const searchFocused = document.activeElement === search;
    const map = [
        {
            match: () => (e.ctrlKey || e.metaKey) && e.key === "f",
            action: () => {
                e.preventDefault();
                search.focus();
            },
        },
        {
            match: () => e.key === "n" && !searchFocused,
            action: () => {
                e.preventDefault();
                view.toNewTask();
            },
        },
        {
            match: () => e.key === "u" && !searchFocused,
            action: () => {
                e.preventDefault();
                view.refetch();
            },
        },
        {
            match: () => e.keyCode === escCode && searchFocused,
            action: () => {
                e.preventDefault();
                const ae = document.activeElement as HTMLInputElement;
                ae.blur();
                ae.value = "";
                view.setState({
                    search: "",
                });
            },
        },
    ];
    hotkeyHandler(map);
};

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
    username: state.auth.username,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout()),
    refetch: (tasks: Task[]) => dispatch(refetchTasks(tasks)),
    delete: (task: Task) => dispatch(deleteTask(task)),
});

interface Props extends RCPWithDispProps<typeof mapDispatchToProps> {
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
    hotkeyHandler = generateHotkeyHandler(this);
    componentDidMount = () => {
        document.addEventListener("keydown", this.hotkeyHandler);
        this.refetch();
    };
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.hotkeyHandler);
    };
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.tasks !== this.props.tasks) {
            this.setState({
                tasks: this.props.tasks,
            });
        }
    };
    toNewTask = () => this.props.history.push("/task/new");
    logout = () => this.props.logout();
    refetch = () => this.props.refetch(this.props.tasks);
    prune = () => {
        const danglingTasks = this.state.tasks.filter(
            (task) =>
                this.state.tasks.filter((child) => child.PID === task.ID)
                    .length === 0 && task.Completed
        );
        danglingTasks.forEach((task) => this.props.delete(task));
        // more tasks possibly left to go?
        danglingTasks.length > 0 && setTimeout(() => this.prune(), uiDelay);
    };
    updateSearch = (e: React.FormEvent<HTMLInputElement>) =>
        this.setState({
            search: e.currentTarget.value,
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
