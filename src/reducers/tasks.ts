import Actions from "../actions/list";
import { TaskAction } from "../typings/actions";
import { Task } from "../typings/tasks";

export interface TaskState {
    tasks: Task[];
    /** Hack. Needed because react-redux won't fire updates unless we change
     * object references, which is not the case for arrays. */
    lastMod: number;
}

export const taskReducer = (
    state: TaskState = { tasks: [], lastMod: Date.now() },
    action: TaskAction
): TaskState => {
    switch (action.type) {
        case Actions.TasksFetch:
            return { tasks: action.data as Task[], lastMod: Date.now() };
        case Actions.TasksFetchError:
            return { ...state, lastMod: Date.now() };
        case Actions.TaskCreate: {
            state.tasks.push(action.data as Task);
            return { ...state, lastMod: Date.now() };
        }
        case Actions.TaskCreateError: {
            const newTask = action.data as Task;
            newTask.ToSync = true;
            state.tasks.push(newTask);
            return { ...state, lastMod: Date.now() };
        }
        case Actions.TaskDelete: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks.splice(index);
            return { ...state, lastMod: Date.now() };
        }
        case Actions.TaskDeleteError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index].ToRemove = true;
            return { ...state, lastMod: Date.now() };
        }
        case Actions.TaskUpdate: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].LastMod = Date.now();
            return { ...state, lastMod: Date.now() };
        }
        case Actions.TaskUpdateError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].ToSync = true;
            state.tasks[index].LastMod = Date.now();
            return { ...state, lastMod: Date.now() };
        }
        default:
            return state;
    }
};
