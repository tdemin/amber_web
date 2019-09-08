import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { TaskAction } from "../../typings/actions";
import { Task } from "../../typings/tasks";
import { Store } from "../../typings/store";

import { updateTask } from "../../actions/tasks";

import strings from "../assets/locales";

const mapStateToProps = (state: Store) => ({
    lastMod: state.task.lastMod,
});

interface Props {
    level: number;
    task: Task;
    dispatch: ThunkDispatch<any, any, TaskAction>;
    lastMod: number;
}
interface State {
    task: Task;
}
class TaskLine extends React.Component<Props, State> {
    state = {
        task: this.props.task,
        // Hack, needed for forcing rerenders.
        lastMod: this.props.lastMod,
    };
    componentDidUpdate = (prevProps: Props) => {
        if (
            prevProps.task !== this.props.task ||
            prevProps.lastMod !== this.props.lastMod
        ) {
            this.setState(() => ({
                task: this.props.task,
                lastMod: this.props.lastMod,
            }));
        }
    };
    toggleTask = (): void => {
        const task: Task = this.state.task;
        task.setCompleted(!task.Completed);
        // wait, we are modifying an object that is supposed to be immutable in
        // the state?
        this.props.dispatch(updateTask(task));
    };
    render = () => {
        const { ID, Completed, Text } = this.state.task;
        let classNames: string[] = ["taskLine"];
        if (Completed) classNames.push("taskCompleted");
        return (
            <div className={classNames.join(" ")}>
                <div className="taskTextPart">
                    <span className="taskID">#{ID}</span>
                    {" - "}
                    <span className="taskText">{Text}</span>
                </div>
                <div className="taskButtons">
                    <input
                        type="button"
                        value={
                            Completed
                                ? strings.task_toggleBtnCompleted
                                : strings.task_toggleBtnPending
                        }
                        onClick={this.toggleTask}
                    />
                </div>
            </div>
        );
    };
}

export default connect(mapStateToProps)(TaskLine);
