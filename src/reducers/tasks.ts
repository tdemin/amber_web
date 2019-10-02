import Actions from "../actions/list";
import { TaskAction } from "../typings/actions";
import { Task } from "../typings/tasks";

// be sure to account for that the sort occurs IN PLACE and this
// does NOT return a new array
const sort = (tasks: Task[]) => tasks.sort((a, b) => a.ID - b.ID);

export interface TaskState {
    tasks: Task[];
}

export const taskReducer = (
    state: TaskState = { tasks: [] },
    action: TaskAction
): TaskState => {
    switch (action.type) {
        case Actions.TasksFetch:
            return { tasks: sort(action.data as Task[]) };
        case Actions.TasksFetchError:
            return { tasks: [...sort(state.tasks)] };
        case Actions.TaskCreate: {
            state.tasks.push(action.data as Task);
            return { tasks: [...sort(state.tasks)] };
        }
        case Actions.TaskCreateError: {
            const newTask = action.data as Task;
            newTask.ToSync = true;
            state.tasks.push(newTask);
            return { tasks: [...sort(state.tasks)] };
        }
        case Actions.TaskDelete: {
            return {
                tasks: [
                    ...sort(
                        state.tasks.filter(
                            (task) => task.ID !== (action.data as Task).ID
                        )
                    ),
                ],
            };
        }
        case Actions.TaskDeleteError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index].ToRemove = true;
            return { tasks: [...sort(state.tasks)] };
        }
        case Actions.TaskUpdate: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].LastMod = Date.now();
            return { tasks: [...sort(state.tasks)] };
        }
        case Actions.TaskUpdateError: {
            const index = state.tasks.findIndex(
                (task) => task.ID === (action.data as Task).ID
            );
            state.tasks[index] = action.data as Task;
            state.tasks[index].ToSync = true;
            state.tasks[index].LastMod = Date.now();
            return { tasks: [...sort(state.tasks)] };
        }
        default:
            return state;
    }
};
