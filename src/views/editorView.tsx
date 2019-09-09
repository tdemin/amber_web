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
    };
    componentDidMount = () => {
        // editing or creating a new task?
        if (this.props.match.params.id !== "new") {
            const id = parseInt(this.props.match.params.id);
            const task = this.props.tasks.find((task) => task.ID === id);
            this.setState(() => ({
                task: task,
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
            });
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
    updateStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { task } = this.state;
        task.Completed = event.currentTarget.checked;
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
        const task: Task = this.state.task;
        return (
            <div className="root">
                <div className="header">
                    <div className="headerLeft">
                        <input
                            type="button"
                            onClick={this.props.history.goBack}
                            value={strings.btns_goBack}
                        />
                    </div>
                    <div className="headerRight">
                        <input
                            type="button"
                            value={strings.btns_updateTask}
                            onClick={this.saveChanges}
                        />
                        <input
                            type="button"
                            value={strings.btns_deleteTask}
                            onClick={this.delete}
                            // we can't delete a task we haven't created yet
                            disabled={this.state.newTask}
                        />
                    </div>
                </div>
                <div className="main">
                    <span className="mainSubheading">
                        #{task.ID} - {task.Text}
                    </span>
                    <div className="editor">
                        <div className="row">
                            <label className="label">
                                {strings.editor_statusTp}
                            </label>
                            <input
                                type="checkbox"
                                checked={task.Completed}
                                onChange={this.updateStatus}
                            />
                        </div>
                        <div className="row">
                            <label className="label">
                                {strings.editor_textTp}
                            </label>
                            <input
                                type="text"
                                onChange={this.updateText}
                                value={task.Text}
                            />
                        </div>
                        <div className="row">
                            <label className="label">
                                {strings.editor_parentTp}
                            </label>
                            <TaskSelect
                                current={task}
                                initialValue={task.PID}
                                onChange={this.updateParent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(EditorView);
