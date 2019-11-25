import React, { HTMLAttributes } from "react";

import { BulmaLevelProps as BP } from "../../../typings/bulma";

/** Encapsulates Bulma `<div class="level">` and its possible descendants.
 * This is a just a drop-in replacement for manual markup. */
export const Level: React.FC<HTMLAttributes<HTMLDivElement> & BP> = (props) => {
    const classes: string[] = [];
    props.level && classes.push("level");
    props.levelItem && classes.push("level-item");
    props.levelLeft && classes.push("level-left");
    props.levelRight && classes.push("level-right");
    props.isMobile && classes.push("is-mobile");
    return (
        <div {...props} className={`${classes.join(" ")} ${props.className}`}>
            {props.children}
        </div>
    );
};

export default Level;
