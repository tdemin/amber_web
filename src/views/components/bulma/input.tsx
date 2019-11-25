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
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
        type={props.password ? "password" : "text"}
        className={"input ".concat(props.className as string)}
    >
        {props.children}
    </input>
);

export default Input;
