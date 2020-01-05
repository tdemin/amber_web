import React, { FC, InputHTMLAttributes } from "react";

/** Encapsulates `<input type="button">`. */
export const Button: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        type="button"
        className={"button ".concat(props.className as string)}
    >
        {props.children}
    </input>
);

export default Button;
