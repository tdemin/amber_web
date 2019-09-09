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
}
class EditorView extends React.Component<Props, State> {
    state = {
        task: {
            Completed: false,
        } as Task,
    };
    componentDidMount = () => {
        const id = parseInt(this.props.match.params.id);
        const task = this.props.tasks.find((task) => task.ID === id);
        // TODO: sanity checks for both expressions, ideally a check whether
        // `params.id` is `new` and creation of a new task if so
        this.setState(() => ({
            task: task,
        }));
    };
    delete = () => {
        this.props.dispatch(deleteTask(this.state.task));
        this.props.history.goBack();
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
        this.props.dispatch(updateTask(this.state.task));
        this.props.history.goBack();
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
                        />
                    </div>
                </div>
                <div className="main">
                    <span className="mainSubheading">
                        #{task.ID} - {task.Text}
                    </span>
                    <div className="editor">
                        <div className="row">
                            <span className="label">
                                {strings.editor_statusTp}
                            </span>
                            <input
                                type="checkbox"
                                checked={task.Completed}
                                onChange={this.updateStatus}
                            />
                        </div>
                        <div className="row">
                            <span className="label">
                                {strings.editor_textTp}
                            </span>
                            <input
                                type="text"
                                onChange={this.updateText}
                                value={task.Text}
                            />
                        </div>
                        <div className="row">
                            <span className="label">
                                {strings.editor_parentTp}
                            </span>
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
