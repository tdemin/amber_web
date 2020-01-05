export const DateFormat = "yyyy-MM-dd";
export const TimeFormat = "HH:mm";

/**
 * Converts a JS date to epoch timestamp.
 * @param date Date in JS `Date` class
 */
export const dateTimeToUnixTime = (date: Date) =>
    parseInt((date.getTime() / 1000).toFixed(0));
