import { AuthState } from "../reducers/auth";
import { ErrorState } from "../reducers/errors";
import { TaskState } from "../reducers/tasks";

export interface Store {
    auth: AuthState;
    errors: ErrorState;
    task: TaskState;
}
