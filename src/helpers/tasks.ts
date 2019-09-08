import { Task, TaskRecord } from "../typings/tasks";

/**
 * Converts a JSON object received from the server to a task record.
 * @param task Task record taken from the server output.
 */
export const taskFromRecord = (task: TaskRecord): Task => {
    const newTask = new Task();
    newTask.ID = task.id as number;
    newTask.PID = "parent_id" in task ? (task.parent_id as number) : 0;
    newTask.Text = "text" in task ? (task.text as string) : "";
    newTask.Completed = task.status !== 0 ? true : false;
    newTask.LastMod = task.last_mod as number;
    return newTask;
};

/**
 * Exports a task record to a JSON object that can be pushed to the
 * server in a POST / PATCH request.
 * @param task Task record
 */
export const taskToRecord = (task: Task): TaskRecord => {
    const record = {
        parent_id: task.PID,
        text: task.Text,
        status: task.Completed ? 1 : 0,
    } as TaskRecord;
    return record;
};
