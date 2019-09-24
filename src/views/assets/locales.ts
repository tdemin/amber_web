import LocalizedStrings from "react-localization";

import { appVersion, appFullName, appAuthor } from "../../const";

export default new LocalizedStrings({
    en: {
        login_loginBtn: "Login",
        login_userNameTp: "User name",
        login_passwordTp: "Password",
        login_wrongPassTp: "Login failed. Check username and password.",
        main_loggedInMsg: "Logged in as",
        main_logoutBtn: "Logout",
        main_searchTp: "Search tasks...",
        btns_goBack: "Back",
        btns_refetch: "Update",
        btns_addTask: "New",
        btns_deleteTask: "Delete",
        btns_pruneTasks: "Prune",
        btns_updateTask: "Save",
        editor_statusTp: "Status:",
        editor_completedTp: "Completed",
        editor_pendingTp: "Pending",
        editor_textTp: "Text:",
        editor_parentTp: "Parent:",
        editor_parentNoParentVal: "No parent",
        task_toggleBtnCompleted: "Completed",
        task_toggleBtnPending: "Pending",
        app_versionString: `${appFullName} v${appVersion} by ${appAuthor}`,
    },
});
