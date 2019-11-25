import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { match as Match, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Field from "./components/bulma/field";
import Level from "./components/bulma/level";
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
            <Container className="editor_view">
                <Level className="navbar" level isMobile>
                    <Level className="headerLeft" levelLeft levelItem>
                        <Button
                            value={strings.btns_goBack}
                            onClick={this.props.history.goBack}
                        />
                    </Level>
                    <Level
                        className="headerRight"
                        levelRight
                        levelItem
                        level
                        isMobile
                    >
                        <Level levelItem>
                            <Button
                                className="level-item"
                                value={strings.btns_updateTask}
                                onClick={this.saveChanges}
                            />
                        </Level>
                        <Level levelItem>
                            <Button
                                className="level-item"
                                value={strings.btns_deleteTask}
                                onClick={this.delete}
                                disabled={this.state.newTask}
                            />
                        </Level>
                    </Level>
                </Level>
                <Level className="main">
                    <span className="subtitle">
                        #{task.ID} - {title}
                    </span>
                    {/* another div, needed for border styling fixes */}
                    <Level className="fix">
                        <Level className="editor">
                            <Field
                                label={strings.editor_statusTp}
                                control={
                                    <Button
                                        id="taskStatusButton"
                                        value={
                                            task.Completed
                                                ? strings.editor_completedTp
                                                : strings.editor_pendingTp
                                        }
                                        onClick={this.updateStatus}
                                    />
                                }
                            />
                            <Field
                                label={strings.editor_textTp}
                                control={
                                    <Input
                                        id="taskTextInput"
                                        autoFocus
                                        onChange={this.updateText}
                                        value={task.Text}
                                    />
                                }
                            />
                            <Field
                                label={strings.editor_parentTp}
                                control={
                                    <TaskSelect
                                        id="taskParentSelect"
                                        current={task}
                                        initialValue={task.PID}
                                        onChange={this.updateParent}
                                    />
                                }
                            />
                        </Level>
                    </Level>
                </Level>
            </Container>
        );
    };
}

export default connect(mapStateToProps)(EditorView);
