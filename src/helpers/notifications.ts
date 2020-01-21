import { Task } from "../typings/tasks";
import strings from "../views/assets/locales";

export const requestNotifications = async () => {
    if (!("Notification" in window)) {
        console.error("This browser does not support notifications.");
        return false;
    }
    let result = await Notification.requestPermission();
    return result === "granted";
};

export const pushNotification = (task: Task) => {
    new Notification(strings.notifications_title, { body: task.Text });
};
