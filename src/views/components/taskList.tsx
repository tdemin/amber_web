import React from "react";

import TaskLine from "./taskLine";

import { Task } from "../../typings/tasks";

interface TreeProps {
    tasks: Task[];
    parent: Task;
    level: number;
}

const TaskTree: React.FC<TreeProps> = (props) => (
    <div className="taskSubtree">
        <TaskLine task={props.parent} level={props.level} />
        {props.tasks
            .filter((task) => task.PID === props.parent.ID)
            .map((task) => (
                <TaskTree
                    tasks={props.tasks}
                    parent={task}
                    level={props.level + 1}
                    key={task.ID}
                />
            ))}
    </div>
);

interface Props {
    tasks: Task[];
    search: string;
}

const TaskList: React.FC<Props> = (props) => {
    const { tasks, search } = props;
    let displayTasks: Task[];
    if (search) {
        displayTasks = tasks.filter(
            (value) =>
                value.Text.toLocaleLowerCase().includes(
                    search.toLocaleLowerCase()
                ) ||
                search
                    .toLocaleLowerCase()
                    .includes(value.Text.toLocaleLowerCase())
        );
    } else {
        displayTasks = tasks.filter((task) => task.PID === 0);
    }
    return (
        <div className="taskList">
            {displayTasks.map((task) => (
                <TaskTree tasks={tasks} parent={task} level={0} key={task.ID} />
            ))}
        </div>
    );
};

export default TaskList;
