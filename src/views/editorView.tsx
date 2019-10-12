import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { match as Match, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import TaskSelect from "./components/taskSelect";

import { deleteTask, updateTask, createTask } from "../actions/tasks";

import { TaskAction } from "../typings/actions";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";

import strings from "./assets/locales";

import "./styles/editorView.scss";

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
});

interface Params {
    id: string;
}
interface Props extends RouteComponentProps {
    tasks: Task[];
    dispatch: ThunkDispatch<any, any, TaskAction>;
    match: Match<Params>;
}
interface State {
    task?: Task;
    newTask: boolean;
    title: string;
}
class EditorView extends React.Component<Props, State> {
    state = {
        task: {
            Completed: false,
            Text: "",
            ID: 0,
            PID: 0,
        } as Task,
        newTask: false,
        title: "",
    };
    componentDidMount = () => {
        // editing or creating a new task?
        if (this.props.match.params.id !== "new") {
            const id = parseInt(this.props.match.params.id);
            const task = this.props.tasks.find(
                (task) => task.ID === id
            ) as Task;
            this.setState(() => ({
                task: task,
                title: task.Text,
            }));
        } else {
            // create a new task
            let maxID = 0;
            this.props.tasks.forEach(
                (task) => task.ID > maxID && (maxID = task.ID)
            );
            const newID = maxID + 1;
            const newTask = {
                ID: newID,
                Text: "",
                Completed: false,
                PID: 0,
            } as Task;
            this.setState({
                task: newTask,
                newTask: true,
                title: strings.editor_newTaskTitle,
            });
        }
        document.addEventListener("keydown", this.handleHotkeys);
    };
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleHotkeys);
    };
    handleHotkeys = (event: KeyboardEvent) => {
        const textInput = document.getElementById("taskTextInput");
        const parentSelect = document.getElementById("taskParentSelect");
        const statusBtn = document.getElementById("taskStatusButton");
        const editFocused =
            document.activeElement === textInput ||
            document.activeElement === parentSelect ||
            document.activeElement === statusBtn;
        if (event.key === "b" && !editFocused) {
            event.preventDefault();
            this.props.history.push("/");
        } else if (event.key === "s" && !editFocused) {
            event.preventDefault();
            this.saveChanges();
        } else if (event.key === "d" && !editFocused && !this.state.newTask) {
            event.preventDefault();
            this.delete();
        } else if (
            event.keyCode === 27 &&
            document.activeElement === textInput
        ) {
            event.preventDefault();
            (textInput as HTMLElement).blur();
        }
    };
    delete = () => {
        this.props.dispatch(deleteTask(this.state.task));
        setTimeout(() => {
            this.props.history.goBack();
        }, 200);
    };
    updateText = (event: React.FormEvent<HTMLInputElement>) => {
        const { task } = this.state;
        task.Text = event.currentTarget.value;
        this.setState(() => ({ task: task }));
    };
    updateStatus = () => {
        const { task } = this.state;
        task.Completed = !task.Completed;
        this.setState(() => ({ task: task }));
    };
    updateParent = (event: React.FormEvent<HTMLSelectElement>) => {
        const newPID = parseInt(event.currentTarget.value);
        const { task } = this.state;
        task.PID = newPID;
        this.setState(() => ({ task: task }));
    };
    saveChanges = () => {
        if (this.state.newTask) {
            this.props.dispatch(createTask(this.state.task));
        } else {
            this.props.dispatch(updateTask(this.state.task));
        }
        // delay the reload so fetching tasks doesn't proceed before we have
        // pushed stuff to the server
        setTimeout(() => {
            this.props.history.goBack();
        }, 200);
    };
    render = () => {
        const { task, title } = this.state;
        return (
            <div className="container editor_view">
                <div className="navbar level is-mobile">
                    <div className="headerLeft level-left level-item">
                        <input
                            type="button"
                            className="button"
                            onClick={this.props.history.goBack}
                            value={strings.btns_goBack}
                        />
                    </div>
                    {/* eslint-disable-next-line max-len */}
                    <div className="headerRight level-right level-item level is-mobile">
                        <input
                            type="button"
                            className="button level-item"
                            value={strings.btns_updateTask}
                            onClick={this.saveChanges}
                        />
                        <input
                            type="button"
                            className="button level-item"
                            value={strings.btns_deleteTask}
                            onClick={this.delete}
                            // we can't delete a task we haven't created yet
                            disabled={this.state.newTask}
                        />
                    </div>
                </div>
                <div className="main">
                    <span className="subtitle">
                        #{task.ID} - {title}
                    </span>
                    {/* another div, needed for border styling fixes */}
                    <div className="fix">
                        <div className="editor">
                            <div className="field">
                                <label className="label">
                                    {strings.editor_statusTp}
                                </label>
                                <div className="control">
                                    <input
                                        id="taskStatusButton"
                                        className="button"
                                        type="button"
                                        value={
                                            task.Completed
                                                ? strings.editor_completedTp
                                                : strings.editor_pendingTp
                                        }
                                        onClick={this.updateStatus}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    {strings.editor_textTp}
                                </label>
                                <div className="control">
                                    <input
                                        id="taskTextInput"
                                        className="input"
                                        type="text"
                                        autoFocus
                                        onChange={this.updateText}
                                        value={task.Text}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    {strings.editor_parentTp}
                                </label>
                                <div className="control">
                                    <div className="select">
                                        <TaskSelect
                                            id="taskParentSelect"
                                            current={task}
                                            initialValue={task.PID}
                                            onChange={this.updateParent}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(EditorView);
