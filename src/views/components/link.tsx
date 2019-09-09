import React, { ReactChild, ReactChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

import "../styles/components.scss";

interface Props {
    children?: (ReactChild | string)[] | ReactChild | ReactChildren;
    to: string;
}

const Link: React.FC<Props> = (props) => (
    <RouterLink className="link" to={props.to} {...props}>
        {props.children}
    </RouterLink>
);

export default Link;
