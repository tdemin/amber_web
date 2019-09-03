import { Task } from "./tasks";

export interface Action {
    type: string;
    data?: any;
}

export interface ErrorAction extends Action {
    text: string;
}

export interface AuthAction extends Action {
    username?: string;
    token?: string;
    authFailed?: boolean;
}

export interface TaskAction extends Action {
    data?: Task | Task[];
}

export type AnyAction = Action & ErrorAction & AuthAction & TaskAction;
