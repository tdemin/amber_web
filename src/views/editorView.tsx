import React from "react";
import { match as Match } from "react-router";
import { connect } from "react-redux";

import Container from "./components/bulma/container";
import Button from "./components/bulma/button";
import Input from "./components/bulma/input";
import Field from "./components/bulma/field";
import Level from "./components/bulma/level";
import TaskSelect from "./components/taskSelect";
import DateTimePicker from "./components/dateTimePicker";

import { deleteTask, updateTask, createTask } from "../actions/tasks";
import { hotkeyHandler, escCode, Hotkey } from "./helpers/keyboard";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";
import { Dispatch, RCPWithDispProps } from "../typings/react";

import strings from "./assets/locales";

const generateHotkeyHandler = (view: EditorView) => (e: KeyboardEvent) => {
    const textInput = document.getElementById("taskTextInput") as HTMLElement;
    const parentSelect = document.getElementById("taskParentSelect");
    const statusBtn = document.getElementById("taskStatusButton");
    const editFocused =
        document.activeElement === textInput ||
        document.activeElement === parentSelect ||
        document.activeElement === statusBtn;
    const map: Hotkey[] = [
        {
            match: () => e.key === "b" && !editFocused,
            action: () => {
                e.preventDefault();
                view.props.history.push("/");
            },
        },
        {
            match: () => e.key === "s" && !editFocused,
            action: () => {
                e.preventDefault();
                view.saveChanges();
            },
        },
        {
            match: () => e.key === "d" && !editFocused && !view.state.newTask,
            action: () => {
                e.preventDefault();
                view.delete();
            },
        },
        {
            match: () =>
                e.keyCode === escCode && document.activeElement === textInput,
            action: () => {
                e.preventDefault();
                textInput.blur();
            },
        },
    ];
    hotkeyHandler(map);
};

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    create: (task: Task) => dispatch(createTask(task)),
    update: (task: Task) => dispatch(updateTask(task)),
    delete: (task: Task) => dispatch(deleteTask(task)),
});

/** Used to delay navigation before we are finished with stuff. */
const waitTimeout = 200;

interface Props extends RCPWithDispProps<typeof mapDispatchToProps> {
    tasks: Task[];
    match: Match<{ id: string }>;
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
            Deadline: 0,
            Reminder: 0,
        } as Task,
        newTask: false,
        title: "",
    };
    hotkeyHandler = generateHotkeyHandler(this);
    componentDidMount = () => {
        document.addEventListener("keydown", this.hotkeyHandler);
        // editing or creating a new task?
        if (this.props.match.params.id !== "new") {
            const id = parseInt(this.props.match.params.id);
            const task = this.props.tasks.find((t) => t.ID === id) as Task;
            this.setState({
                task,
                title: task.Text,
            });
        } else {
            // create a new task
            let maxID = 0;
            // find the biggest ID and use <maxID + 1>
            this.props.tasks.forEach((t) => t.ID > maxID && (maxID = t.ID));
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
    };
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.hotkeyHandler);
    };
    delete = () => {
        this.props.delete(this.state.task);
        setTimeout(() => {
            this.props.history.goBack();
        }, waitTimeout);
    };
    updateText = (e: React.FormEvent<HTMLInputElement>) => {
        const { task } = this.state;
        task.Text = e.currentTarget.value;
        this.setState({ task });
    };
    updateStatus = () => {
        const { task } = this.state;
        task.Completed = !task.Completed;
        this.setState({ task });
    };
    updateParent = (e: React.FormEvent<HTMLSelectElement>) => {
        const newPID = parseInt(e.currentTarget.value);
        const { task } = this.state;
        task.PID = newPID;
        this.setState({ task });
    };
    updateDeadline = (date: number) => {
        const { task } = this.state;
        task.Deadline = date;
        this.setState({ task });
    };
    updateReminder = (date: number) => {
        const { task } = this.state;
        task.Reminder = date;
        this.setState({ task });
    };
    saveChanges = () => {
        if (this.state.newTask) {
            this.props.create(this.state.task);
        } else {
            this.props.update(this.state.task);
        }
        // delay the reload so fetching tasks doesn't proceed before we have
        // pushed stuff to the server
        setTimeout(() => {
            this.props.history.goBack();
        }, waitTimeout);
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
                    <span className="subtitle">{`#${task.ID} - ${title}`}</span>
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
                                        tasks={this.props.tasks}
                                        current={task}
                                        initialValue={task.PID}
                                        onChange={this.updateParent}
                                    />
                                }
                            />
                            <Field
                                label={strings.editor_deadline}
                                control={
                                    <DateTimePicker
                                        initialValue={task.Deadline}
                                        onChange={this.updateDeadline}
                                    />
                                }
                            />
                            <Field
                                label={strings.editor_reminder}
                                control={
                                    <DateTimePicker
                                        initialValue={task.Reminder}
                                        onChange={this.updateReminder}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorView);
