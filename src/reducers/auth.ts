import Actions from "../actions/list";
import { AuthAction } from "../typings/actions";

export interface AuthState {
    username?: string;
    token?: string;
    loginFailed?: boolean;
}

export const authReducer = (
    state: AuthState = {
        username: "",
        token: "",
        loginFailed: false,
    },
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case Actions.LoginSuccess:
            return {
                username: action.username,
                token: action.token,
                loginFailed: false,
            };
        case Actions.LoginFailed:
            return {
                username: "",
                token: "",
                loginFailed: true,
            };
        case Actions.LoggedOut:
            return {
                username: "",
                token: "",
                loginFailed: false,
            };
        default:
            return state;
    }
};
