import React from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

import Level from "../components/bulma/level";
import Button from "../components/bulma/button";
import Link from "../components/link";

import { Task } from "../../typings/tasks";

import { updateTask } from "../../actions/tasks";

import strings from "../assets/locales";
import { Dispatch } from "../../typings/react";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    update: (task: Task) => dispatch(updateTask(task)),
});

interface Props extends ReturnType<typeof mapDispatchToProps> {
    level: number;
    task: Task;
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
        this.props.update(task);
    };
    // Pp expands to a localized date string that looks like this:
    // "05/29/1453, 12:00 AM"
    fmtDate = (date: number) => format(new Date(date), "Pp");
    render = () => {
        const {
            ID,
            Completed,
            ToRemove,
            Text,
            Deadline,
            Reminder,
        } = this.state.task;
        let classNames: string[] = ["taskLine"];
        Completed && classNames.push("taskCompleted");
        ToRemove && classNames.push("taskToRemove");
        Deadline && classNames.push("taskHasDeadline");
        Reminder && classNames.push("taskHasReminder");
        return (
            <Level level isMobile className={classNames.join(" ")}>
                <Level levelItem levelLeft className="taskText">
                    <Link to={`/task/${ID}`}>
                        <span className="taskID">{`#${ID} - `}</span>
                        <span className="taskText">{Text}</span>
                        <span className="taskDeadline">
                            {` - (D: ${this.fmtDate(Deadline)})`}
                        </span>
                        <span className="taskReminder">
                            {` - (R: ${this.fmtDate(Reminder)})`}
                        </span>
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

export default connect(null, mapDispatchToProps)(TaskLine);
