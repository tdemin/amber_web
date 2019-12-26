import { AxiosResponse, AxiosError } from "axios";

export type SuccessAction = (s: AxiosResponse) => void;
export type FailAction = (e: AxiosError) => void;

export type AuthData = {
    username: string;
    password: string;
};

export type VersionData = {
    version: string;
    signup: boolean;
};
