import req from "../axios";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "redux";

import Actions from "./list";
import { TaskAction } from "../typings/actions";
import { TaskRecord, Task } from "../typings/tasks";
import { taskFromRecord, taskToRecord } from "../helpers/tasks";

/**
 * Redux action creator. Fetches the task list from the server and
 * deserializes task data from JSON. Checks the local task list passed as the
 * parameter for items that are yet to be synced; if such items are found, it
 * pushes them one-by-one to the server. It also checks the list for the items
 * to be removed and sends a DELETE request for them as well. It compares
 * lastmods for every task; if last mod of the server is earlier, then a PATCH
 * request is issued; if client has an earlier mod time, than the server task
 * version is stored instead. If there are local items that do not have a pair
 * in the remote store and don't have `ToSync` set to `true`, they are
 * discarded. Loads the just built task list into the store.
 * @param localTasks The local task list
 */
export const refetchTasks = (localTasks: Task[]) =>
    function(dispatch: Dispatch) {
        req.get("/task").then(
            (res: AxiosResponse) => {
                const remoteTasks = res.data["tasks"].map(
                    (x: TaskRecord): Task => taskFromRecord(x)
                ) as Task[];
                const tasks: Task[] = [];
                // first passthrough
                remoteTasks.forEach((remote) => {
                    const local = localTasks.find(
                        (val) => val.ID === remote.ID
                    );
                    if (local) {
                        // matching local task found, comparing modtimes
                        // we'd rather prefer the remote record over a local one
                        // on matching modtimes
                        if (local.LastMod > remote.LastMod) {
                            tasks.push(local);
                            req.patch(`/task/${local.ID}`, taskToRecord(local));
                        }
                        if (local.LastMod <= remote.LastMod) tasks.push(remote);
                    } else {
                        // matching local task not found, adding a new task to
                        // the store
                        tasks.push(remote);
                    }
                });
                // second passthrough
                localTasks.forEach((local) => {
                    // check whether we haven't already pushed this task
                    if (!tasks.find((task) => task.ID === local.ID)) {
                        const remote = remoteTasks.find(
                            (val) => val.ID === local.ID
                        );
                        if (remote) {
                            if (local.LastMod >= remote.LastMod) {
                                tasks.push(local);
                                req.patch(
                                    `/task/${local.ID}`,
                                    taskToRecord(local)
                                );
                            }
                            if (local.LastMod < remote.LastMod)
                                tasks.push(remote);
                        } else {
                            if (local.ToSync) {
                                req.post("/task", taskToRecord(local));
                                // not pushing the task so we don't cause collisions
                            }
                            if (local.ToRemove) {
                                req.delete(`/task/${local.ID}`);
                                // not pushing the task as well
                            }
                        }
                    }
                });
                // push the results to the store
                dispatch({
                    type: Actions.TasksFetch,
                    data: tasks,
                } as TaskAction);
            },
            (err: AxiosError) => {
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
export const createTask = (task: Task) =>
    function(dispatch: Dispatch) {
        req.post("/task", taskToRecord(task)).then(
            (res: AxiosResponse) => {
                const id: number = res.data["id"];
                task.ID = id;
                dispatch({
                    type: Actions.TaskCreate,
                    data: task,
                } as TaskAction);
            },
            (err: AxiosError) => {
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
export const updateTask = (task: Task) =>
    function(dispatch: Dispatch) {
        req.patch(`/task/${task.ID}`, taskToRecord(task)).then(
            (res: AxiosResponse) => {
                dispatch({
                    type: Actions.TaskUpdate,
                    data: task,
                } as TaskAction);
            },
            (err: AxiosError) => {
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
export const deleteTask = (task: Task) =>
    function(dispatch: Dispatch) {
        req.delete(`/task/${task.ID}`).then(
            (res: AxiosResponse) => {
                dispatch({
                    type: Actions.TaskDelete,
                    data: task,
                } as TaskAction);
            },
            (err: AxiosError) => {
                dispatch({
                    type: Actions.TaskDeleteError,
                    data: task,
                });
            }
        );
    };
