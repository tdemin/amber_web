import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { match as Match, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

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
        task: {} as Task,
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
    render = () => {
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
                            value={strings.btns_deleteTask}
                            onClick={this.delete}
                        />
                    </div>
                </div>
                <div className="main">
                    <span>{(this.state.task as Task).ID}</span>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(EditorView);
