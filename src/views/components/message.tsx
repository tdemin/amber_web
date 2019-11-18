import React from "react";

interface Props {
    condition: boolean;
    message: string;
}

/** Component used for conditional rendering of simple tooltip messages. */
export const Message: React.FC<Props> = (props) => (
    <span
        className="message"
        style={{ display: props.condition ? "block" : "none" }}
    >
        {props.message}
    </span>
);

export default Message;
