import { AxiosResponse, AxiosError } from "axios";

export type SuccessAction = (s: AxiosResponse) => void;
export type FailAction = (e: AxiosError) => void;

export type AuthData = {
    username: string;
    password: string;
};

/**
 * Serializes authentication data into a JSON object to be pushed to the API
 * server. Returns the resulting object.
 */
export const serializeAuthData = (
    username: string,
    password: string
): AuthData => ({
    username,
    password,
});

export default serializeAuthData;
