export type Hotkey = {
    /** A function that resolves to true when we need to call an action. */
    match: () => boolean;
    /** An action that we'd like to call when a match is triggered. */
    action: () => void;
};

/**
 * Returns a function that runs through the array of hotkey handlers and calls
 * the necessary action when a key condition is met.
 */
export const hotkeyHandler = (hotkeys: Hotkey[]) => {
    hotkeys.forEach((hotkey) => {
        if (hotkey.match()) {
            hotkey.action();
        }
    });
};

/** Escape key code. */
export const escCode = 27;
