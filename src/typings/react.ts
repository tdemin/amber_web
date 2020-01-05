import React from "react";
import { Dispatch as DispatchFunction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps } from "react-router";

import { AnyAction } from "./actions";

/** Generic type for React children. */
export type ReactDescendant =
    | (React.ReactChild | string)[]
    | React.ReactChild
    | React.ReactChildren
    | string
    | React.ReactNode
    | React.ReactNode[];

/** Dispatching function, possibly using Redux-Thunk middleware. */
export type Dispatch = DispatchFunction & ThunkDispatch<any, any, AnyAction>;

/** Component properties passed by by React-Redux. */
export type ReduxProps = {
    dispatch: Dispatch;
};

/** Route component props, including dispatching function. */
export type RCPWithDispatch = RouteComponentProps & {
    dispatch: Dispatch;
};

type AnyFunction = (...args: any) => any;

/** Route component props, extended by mapDispatchToProps return value. Pass
 * `typeof func` as the generic parameter. */
export type RCPWithDispProps<func extends AnyFunction> = RouteComponentProps &
    ReturnType<func>;
