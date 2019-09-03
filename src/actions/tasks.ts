import req from "../axios";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "redux";

import Actions from "./list";
import { TaskAction } from "../typings/actions";
import { TaskRecord, Task } from "../typings/tasks";
import { taskFromRecord, taskToRecord } from "../helpers/tasks";

/**
 * Redux action creator. Fetches the task list from the server and
 * deserializes task data from JSON. Sends an action that instructs the
 * store to merge the list received from the server with the current
 * data. Does nothing on fail.
 */
export const fetchTasks = () =>
    function(dispatch: Dispatch) {
        req.get("/task").then(
            (res: AxiosResponse) => {
                const tasks = res.data["tasks"].map(
                    (x: TaskRecord): Task => taskFromRecord(x)
                ) as Task[];
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
 * TODO: on fail?
 */
export const createTask = (task: Task) =>
    function(dispatch: Dispatch) {
        req.post("/task", taskToRecord(task)).then(
            (res: AxiosResponse) => {
                const id: number = res.data["id"];
                task.setID(id);
                dispatch({
                    type: Actions.TaskCreate,
                    data: task,
                } as TaskAction);
                // TODO: isn't the reducer supposed to do nothing, as we
                // pass the reference to the original object?
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
 * new task details. TODO: on fail?
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
 * Redux action creator. Sends a DELETE request to the server. TODO:
 * on fail?
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
