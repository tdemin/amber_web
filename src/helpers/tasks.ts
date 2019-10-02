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

export interface TaskMergeResult {
    result: Task[];
    toDelete: Task[];
    toUpdate: Task[];
    toSync: Task[];
}

/**
 * Merges two task lists based on their modtimes. Prefers remote tasks on
 * matching modtimes. Returns the four lists: the merged task list, the list
 * of tasks to be sent for deletion, and the list of tasks to be pushed to the
 * server as well as the list of tasks to be updated remotely.
 * @param remote Task list received from remote server
 * @param local Task list version stored locally
 */
export const mergeTasks = (
    remoteTasks: Task[],
    localTasks: Task[]
): TaskMergeResult => {
    const result: Task[] = [],
        toDelete: Task[] = [],
        toSync: Task[] = [],
        toUpdate: Task[] = [];
    // first passthrough
    remoteTasks.forEach((remote) => {
        // prettier-ignore
        const local = localTasks.find((val) => val.ID === remote.ID);
        if (local) {
            // matching local task found, comparing modtimes
            if (local.LastMod > remote.LastMod) {
                result.push(local);
                toUpdate.push(local);
            } else result.push(remote);
        } else {
            // matching local task not found, adding a new task to the store
            result.push(remote);
        }
    });
    // second passthrough
    localTasks.forEach((local) => {
        // check whether we haven't already pushed this task
        if (!result.find((task) => task.ID === local.ID)) {
            // prettier-ignore
            const remote = remoteTasks.find((val) => val.ID === local.ID);
            if (remote) {
                if (local.LastMod >= remote.LastMod) {
                    result.push(local);
                    toUpdate.push(local);
                } else {
                    result.push(remote);
                }
                if (local.ToRemove) toDelete.push(local);
            } else {
                if (local.ToSync) {
                    result.push(local);
                    toSync.push(local);
                }
            }
        }
    });
    return {
        result: result,
        toDelete: toDelete,
        toSync: toSync,
        toUpdate: toUpdate,
    };
};
