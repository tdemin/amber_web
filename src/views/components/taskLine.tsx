import React from "react";

import { Task } from "../../typings/tasks";

interface Props {
    level: number;
    task: Task;
}
const TaskLine: React.FC<Props> = (props) => {
    const { task } = props;
    return (
        <div className="taskLine">
            #{task.ID} - {task.Text}
        </div>
    );
};

export default TaskLine;
