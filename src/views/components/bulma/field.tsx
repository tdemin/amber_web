import React, { FC, HTMLAttributes } from "react";

import { Control } from "./control";

import { BulmaFieldProps } from "../../../typings/bulma";

/** Encapsulates `<div class="field">`. */
export const Field: FC<HTMLAttributes<HTMLDivElement> & BulmaFieldProps> = (
    props
) => (
    <div className={"field ".concat(props.className as string)} {...props}>
        <label className="label">{props.label}</label>
        <Control>{props.control ? props.control : props.children}</Control>
    </div>
);

export default Field;
