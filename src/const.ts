export const baseURI: string =
    process.env.REACT_APP_APIURI || "https://amber.h.tdem.in/api/v0";

export const appVersion: string = "0.0.8";
export const appFullName: string = "Amber Web";
export const appName: string = "amber_web";
export const appAuthor: string = "Timur Demin";
export const appHomePage: string = "https://git.tdem.in/tdemin/amber_web";

export const amberFullName: string = "Amber Server";
export const amberHomePage: string = "https://git.tdem.in/tdemin/amber";

/** Network timeout (in ms) as used by Axios. */
export const networkTimeout: number = 5000;
/** Delay used for UI stuff like purging tasks recursively. */
export const uiDelay: number = 1000;
