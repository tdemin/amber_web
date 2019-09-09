import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { match as Match, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import { TaskAction } from "../typings/actions";
import { Task } from "../typings/tasks";
import { Store } from "../typings/store";

import strings from "./assets/locales";

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
    render = () => {
        return (
            <div className="root">
                <div className="header">
                    <input
                        type="button"
                        onClick={this.props.history.goBack}
                        value={strings.btns_goBack}
                    />
                </div>
                <div className="main">
                    <span>{(this.state.task as Task).ID}</span>
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(EditorView);
