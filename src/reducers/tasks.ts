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
        case Actions.TaskCreate: {
            state.tasks.push(action.data as Task);
            return state;
        }
        case Actions.TaskCreateError: {
            const newTask = action.data as Task;
            newTask.ToSync = true;
            state.tasks.push(newTask);
            return state;
        }
        case Actions.TaskDelete: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks.splice(index);
            return state;
        }
        case Actions.TaskDeleteError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index].ToRemove = true;
            return state;
        }
        case Actions.TaskUpdate: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].updateLastMod();
            return state;
        }
        case Actions.TaskUpdateError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].ToSync = true;
            state.tasks[index].updateLastMod();
            return state;
        }
        default:
            return state;
    }
};
