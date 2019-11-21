import React, { HTMLAttributes } from "react";

import { BulmaLevelProps as BP } from "../../../typings/bulma";

/** Encapsulates Bulma `<div class="level">` and its possible descendants.
 * This is a just a drop-in replacement for manual markup. */
export const Level: React.FC<HTMLAttributes<HTMLDivElement> & BP> = (props) => {
    const classes: string[] = [];
    if (props.level) classes.push("level");
    if (props.levelItem) classes.push("level-item");
    if (props.levelLeft) classes.push("level-left");
    if (props.levelRight) classes.push("level-right");
    if (props.isMobile) classes.push("is-mobile");
    return (
        <div {...props} className={`${classes.join(" ")} ${props.className}`}>
            {props.children}
        </div>
    );
};

export default Level;
