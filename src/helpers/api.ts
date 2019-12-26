import { AuthData } from "../typings/api";

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
