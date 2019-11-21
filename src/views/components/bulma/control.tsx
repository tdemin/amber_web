import React, { FC, HTMLAttributes } from "react";

/** Encapsulates `<div class="control">`. */
export const Control: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
    <div {...props} className={`control ${props.className}`}>
        {props.children}
    </div>
);

export default Control;
