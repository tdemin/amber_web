import React, { HTMLAttributes } from "react";

/** Wraps `<div class="container">`. */
export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => (
    <div {...props} className={`container ${props.className}`}>
        {props.children}
    </div>
);

export default Container;
