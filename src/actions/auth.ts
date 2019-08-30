import req from "../axios";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "redux";

import Actions from "./list";
import { AuthAction } from "../typings/actions";

const tokenHeader = "X-Auth-Token";

/**
 * Redux action creator. Performs an HTTP request, if it succeeds, copies
 * the token from the response.
 * @param username User name
 * @param password Password in plain text
 */
export const login = (username: string, password: string) =>
    function(dispatch: Dispatch): void {
        req.post("/login", {
            name: username,
            password: password,
        }).then(
            (res: AxiosResponse) => {
                setToken(res.data.token);
                dispatch({
                    type: Actions.LoginSuccess,
                    username: username,
                    token: res.data.token,
                } as AuthAction);
            },
            (err: AxiosError) => {
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
export const logout = () =>
    function(dispatch: Dispatch): void {
        req.post("/logout", {}).then(() => {
            resetToken();
            dispatch({
                type: Actions.LoggedOut,
            } as AuthAction);
        });
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
