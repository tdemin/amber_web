import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps as RCP } from "react-router";
import format from "date-fns/format";

import Level from "../components/bulma/level";
import Button from "../components/bulma/button";

import { Task } from "../../typings/tasks";
import { Dispatch } from "../../typings/react";

import { updateTask } from "../../actions/tasks";

import strings from "../assets/locales";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    update: (task: Task) => dispatch(updateTask(task)),
});

interface Props extends ReturnType<typeof mapDispatchToProps>, RCP {
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
    gotoEditor = () => this.props.history.push(`/task/${this.state.task.ID}`);
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
                <Level
                    level
                    levelItem
                    levelLeft
                    className="taskData"
                    onClick={this.gotoEditor}
                >
                    <Level levelItem className="taskTextWrapper">
                        <span className="taskID">{`#${ID}`}</span>
                        {/* eslint-disable react/jsx-no-literals */}
                        &nbsp;
                        <span className="taskText">{Text}</span>
                    </Level>
                    <Level levelItem className="taskDates">
                        <span className="taskDeadline">
                            {`(D: ${this.fmtDate(Deadline)})`}
                            {/* eslint-disable react/jsx-no-literals */}
                            &nbsp;
                        </span>
                        <span className="taskReminder">
                            {`(R: ${this.fmtDate(Reminder)})`}
                        </span>
                    </Level>
                </Level>
                <Level levelItem levelRight className="taskButton">
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

export default withRouter(connect(null, mapDispatchToProps)(TaskLine));
