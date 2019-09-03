import Actions from "../actions/list";
import { TaskAction } from "../typings/actions";
import { Task } from "../typings/tasks";

export interface TaskState {
    tasks: Task[];
}

export const taskReducer = (
    state: TaskState = { tasks: [] },
    action: TaskAction
): TaskState => {
    switch (action.type) {
        case Actions.TasksFetch:
            return { tasks: action.data as Task[] };
        case Actions.TasksFetchError:
            return state;
        // TODO: more to come
        default:
            return state;
    }
};
