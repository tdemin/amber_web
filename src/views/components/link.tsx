import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ReactDescendant } from "../../typings/react";

import "../styles/components.scss";

interface Props {
    children?: ReactDescendant;
    to: string;
}

const Link: React.FC<Props> = (props) => (
    <RouterLink className="link" to={props.to} {...props}>
        {props.children}
    </RouterLink>
);

export default Link;
