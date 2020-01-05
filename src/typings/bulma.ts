import React from "react";

import { ReactDescendant } from "./react";

/**
 * A properties list for Bulma's level components (essentially flexbox with
 * children).
 */
export interface BulmaLevelProps {
    /** Make this component a flexbox. */
    level?: boolean;
    /** Make this component a flexbox item. */
    levelItem?: boolean;
    /** In a flexbox, align this component to the left side of the box. */
    levelLeft?: boolean;
    /** In a flexbox, align this component to the right side of the box. */
    levelRight?: boolean;
    /** If the components inside a flexbox overfill the screen space, still try
     * to fit them in a single row on mobile phones. Applies to level
     * components. */
    isMobile?: boolean;
}

/**
 * List of properties used by the `<div className="field">` component in
 * Bulma.
 */
export interface BulmaFieldProps {
    /** `<label className="label">` */
    label?: ReactDescendant;
    /** `<div className="control">` */
    control?: React.ReactNode;
}

/** List of properties used by the `<section>` component in Bulma. */
export interface BulmaSectionProps {
    isMedium?: boolean;
    isLarge?: boolean;
}
