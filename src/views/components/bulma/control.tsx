import React, { FC, HTMLAttributes } from "react";

/** Encapsulates `<div class="control">`. */
export const Control: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
    <div className={"control ".concat(props.className as string)} {...props}>
        {props.children}
    </div>
);

export default Control;
