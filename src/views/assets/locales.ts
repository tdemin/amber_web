/* eslint-disable max-len */

import LocalizedStrings from "react-localization";

import { appVersion, appFullName, appAuthor, amberFullName } from "../../const";

export default new LocalizedStrings({
    en: {
        login_loginBtn: "Login",
        login_userNameTp: "User name",
        login_passwordTp: "Password",
        login_wrongPassTp: "Login failed. Check username and password.",
        signup_processMsg: "Signing up...",
        signup_successMsg: "Success. Redirecting to login...",
        signup_failMsg: "Signup failed",
        signup_unknownError: "Unknown error",
        signup_disabled: "Signup disabled",
        signup_userExists: "User with this name exists",
        login_signupBtn: "Sign up",
        login_goBackBtn: "Go back",
        main_loggedInMsg: "Logged in as",
        main_logoutBtn: "Logout",
        main_searchTp: "Search tasks...",
        btns_goBack: "Back",
        btns_refetch: "Update",
        btns_addTask: "New",
        btns_deleteTask: "Delete",
        btns_pruneTasks: "Prune",
        btns_updateTask: "Save",
        editor_newTaskTitle: "New task",
        editor_statusTp: "Status:",
        editor_completedTp: "Completed",
        editor_pendingTp: "Pending",
        editor_textTp: "Text:",
        editor_parentTp: "Parent:",
        editor_parentNoParentVal: "No parent",
        editor_deadline: "Deadline:",
        editor_reminder: "Reminder:",
        task_toggleBtnCompleted: "Completed",
        task_toggleBtnPending: "Pending",
        app_versionString: `${appFullName} v${appVersion} by ${appAuthor}`,
        app_fullVersionString: (version: string) =>
            `${appFullName} v${appVersion} by ${appAuthor}, running on top of ${amberFullName} v${version}`,
        about_licenseInfo: "This app is free software, licensed MIT.",
        about_amberWebHomePage: "Get Amber Web source code.",
        about_amberHomePage: "Get Amber source code.",
        about_linksParagraph: "Links:",
    },
});
