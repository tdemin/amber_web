import format from "date-fns/format";

export const DateFormat = "yyyy-MM-dd";
export const TimeFormat = "HH:mm";

/**
 * Converts a JS date to epoch timestamp. Returns `0` on error.
 * @param date Date in JS `Date` class
 */
export const dateTimeToUnixTime = (date: Date) => date.getTime() || 0;

/**
 * Expands a Unix epoch timestamp into a string that looks like this:
 * "05/29/1453, 12:00 AM"
 */
export const fmtDate = (date: number) => format(new Date(date), "Pp");
