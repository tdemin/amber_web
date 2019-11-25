import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Level from "../components/bulma/level";
import Button from "../components/bulma/button";
import Link from "../components/link";

import { TaskAction } from "../../typings/actions";
import { Task } from "../../typings/tasks";

import { updateTask } from "../../actions/tasks";

import strings from "../assets/locales";

interface Props {
    level: number;
    task: Task;
    dispatch: ThunkDispatch<any, any, TaskAction>;
}
interface State {
    task: Task;
}
class TaskLine extends React.Component<Props, State> {
    state = {
        task: this.props.task,
    };
    componentDidUpdate = (prevProps: Props) => {
        if (prevProps !== this.props) {
            this.setState({
                task: this.props.task,
            });
        }
    };
    toggleTask = (): void => {
        const task: Task = { ...this.state.task };
        task.Completed = !task.Completed;
        this.props.dispatch(updateTask(task));
    };
    render = () => {
        const { ID, Completed, ToRemove, Text } = this.state.task;
        let classNames: string[] = ["taskLine"];
        Completed && classNames.push("taskCompleted");
        ToRemove && classNames.push("taskToRemove");
        return (
            <Level level isMobile className={classNames.join(" ")}>
                <Level levelItem levelLeft className="taskText">
                    <Link to={`/task/${ID}`}>
                        <span className="taskID">{`#${ID} - `}</span>
                        <span className="taskText">{Text}</span>
                    </Link>
                </Level>
                <Level levelItem levelRight>
                    <Button
                        value={
                            Completed
                                ? strings.task_toggleBtnCompleted
                                : strings.task_toggleBtnPending
                        }
                        onClick={this.toggleTask}
                    />
                </Level>
            </Level>
        );
    };
}

export default connect()(TaskLine);
