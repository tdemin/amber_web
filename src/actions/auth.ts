import req from "../axios";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

import Actions from "./list";
import { AuthAction } from "../typings/actions";
import { serializeAuthData } from "../helpers/api";
import { SuccessAction, FailAction } from "../typings/api";

const tokenHeader = "X-Auth-Token";

/**
 * Redux action creator. Performs an HTTP request, if it succeeds, copies
 * the token from the response.
 * @param user User name
 * @param pass Password in plain text
 */
export const login = (user: string, pass: string) => (dispatch: Dispatch) => {
    req.post("/login", serializeAuthData(user, pass)).then(
        (res: AxiosResponse) => {
            setToken(res.data.token);
            dispatch({
                type: Actions.LoginSuccess,
                username: user,
                token: res.data.token,
            } as AuthAction);
        },
        () => {
            dispatch({
                type: Actions.LoginFailed,
            } as AuthAction);
        }
    );
};

/**
 * Redux action creator. Performs an HTTP request, if it succeeds, clears
 * the token from the cache.
 */
export const logout = () => (dispatch: Dispatch) => {
    req.post("/logout", {}).then(() => {
        resetToken();
        dispatch({
            type: Actions.LoggedOut,
        } as AuthAction);
    });
};

/**
 * Signup function. Performs an HTTP POST request, calls the provided functions
 * on success/fail.
 * @param user Username
 * @param pass Password in plain text
 * @param sh Function to be called on success
 * @param fh Function to be called on fail
 */
export const signup = (
    user: string,
    pass: string,
    sh: SuccessAction,
    fh: FailAction
) => {
    req.post("/signup", serializeAuthData(user, pass)).then(sh, fh);
};

/**
 * Sets an auth token in the app's Axios instance to be used in every request
 * from now on.
 * @param token Auth token in plain text.
 */
export const setToken = (token: string) => {
    req.defaults.headers.common[tokenHeader] = token;
};

/**
 * Resets the auth token set in app's Axios instance.
 */
export const resetToken = () => {
    delete req.defaults.headers.common[tokenHeader];
};
