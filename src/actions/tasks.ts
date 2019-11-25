import req from "../axios";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

import Actions from "./list";
import { TaskAction } from "../typings/actions";
import { TaskRecord, Task } from "../typings/tasks";
import {
    taskFromRecord,
    taskToRecord,
    mergeTasks,
    TaskMergeResult,
} from "../helpers/tasks";

/**
 * Loads the merge results into Redux store. Calls the corresponding action
 * creators for tasks to be deleted/updated/created remotely.
 * @param merge The result of `mergeTasks` on remote and local tasks
 * @param dispatch Dispatching function passed by the action creator
 */
const resolveUpdates = (merge: TaskMergeResult, dispatch: Dispatch) => {
    dispatch({
        type: Actions.TasksFetch,
        data: merge.result,
    } as TaskAction);
    merge.toDelete.forEach((task) => deleteTask(task)(dispatch));
    merge.toSync.forEach((task) => createTask(task)(dispatch));
    merge.toUpdate.forEach((task) => updateTask(task)(dispatch));
};

/**
 * Redux action creator. Fetches the task list from the server and
 * deserializes task data from JSON. Loads the just built task list into
 * the store. Sends the corresponding update requests for the tasks to be
 * deleted, updated, etc.
 * @param localTasks The local task list
 */
export const refetchTasks = (localTasks: Task[]) => (dispatch: Dispatch) => {
    req.get("/task").then(
        (res: AxiosResponse) => {
            const remoteTasks = res.data["tasks"].map((x: TaskRecord) =>
                taskFromRecord(x)
            ) as Task[];
            const merge = mergeTasks(remoteTasks, localTasks);
            resolveUpdates(merge, dispatch);
        },
        () => {
            dispatch({
                type: Actions.TasksFetchError,
            } as TaskAction);
        }
    );
};

/**
 * Redux action creator. Sends a task creation request to the server,
 * fetches the ID it receives, and updates the task with that ID.
 */
export const createTask = (task: Task) => (dispatch: Dispatch) => {
    req.post("/task", taskToRecord(task)).then(
        (res: AxiosResponse) => {
            const { id } = res.data;
            task.ID = id;
            dispatch({
                type: Actions.TaskCreate,
                data: task,
            } as TaskAction);
        },
        () => {
            dispatch({
                type: Actions.TaskCreateError,
                data: task,
            } as TaskAction);
        }
    );
};

/**
 * Redux action creator. Sends a PATCH request to the server with the
 * new task details.
 */
export const updateTask = (task: Task) => (dispatch: Dispatch) => {
    req.patch(`/task/${task.ID}`, taskToRecord(task)).then(
        () => {
            dispatch({
                type: Actions.TaskUpdate,
                data: task,
            } as TaskAction);
        },
        () => {
            dispatch({
                type: Actions.TaskUpdateError,
                data: task,
            } as TaskAction);
        }
    );
};

/**
 * Redux action creator. Sends a DELETE request to the server.
 */
export const deleteTask = (task: Task) => (dispatch: Dispatch) => {
    req.delete(`/task/${task.ID}`).then(
        () => {
            dispatch({
                type: Actions.TaskDelete,
                data: task,
            } as TaskAction);
        },
        () => {
            dispatch({
                type: Actions.TaskDeleteError,
                data: task,
            });
        }
    );
};
