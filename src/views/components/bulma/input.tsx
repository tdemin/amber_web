import React, { InputHTMLAttributes } from "react";

interface Props {
    /** Specifies whether this text field is holding password. */
    password?: boolean;
}

/** Encapsulates `<input type="password" | "text">`. */
export const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & Props> = (
    props
) => (
    <input
        type={props.password ? "password" : "text"}
        className={"input ".concat(props.className as string)}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
    >
        {props.children}
    </input>
);

export default Input;
