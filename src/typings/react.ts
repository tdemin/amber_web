import React from "react";

/** Generic type for React children. */
export type ReactDescendant =
    | (React.ReactChild | string)[]
    | React.ReactChild
    | React.ReactChildren
    | string
    | React.ReactNode
    | React.ReactNode[];
