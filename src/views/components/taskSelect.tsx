import React, { HTMLAttributes } from "react";
import { connect } from "react-redux";

import { Store } from "../../typings/store";
import { Task } from "../../typings/tasks";

import strings from "../assets/locales";

const mapStateToProps = (state: Store) => ({
    tasks: state.task.tasks,
});

interface Props extends HTMLAttributes<HTMLSelectElement> {
    tasks: Task[];
    current: Task;
    initialValue: number;
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}
const TaskSelect: React.FC<Props> = (props) => (
    <select
        id={props.id}
        onChange={props.onChange}
        value={props.initialValue}
        className={props.className}
    >
        <option value={0}>{strings.editor_parentNoParentVal}</option>
        {props.tasks.map(
            (task) =>
                task.ID !== props.current.ID && (
                    <option
                        key={task.ID}
                        value={task.ID}
                    >{`${task.ID} - ${task.Text}`}</option>
                )
        )}
    </select>
);

export default connect(mapStateToProps)(TaskSelect);
