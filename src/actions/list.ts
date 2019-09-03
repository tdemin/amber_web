enum Actions {
    Success = "SUCCESS",
    Error = "ERROR",
    LoginSuccess = "LOGIN_SUCCESS",
    LoginFailed = "LOGIN_FAILED",
    LoggedOut = "LOGGED_OUT",
    TasksFetch = "TASKS_FETCH",
    TasksFetchError = "TASKS_FETCH_ERROR",
    TaskCreate = "TASK_CREATE",
    TaskCreateError = "TASK_CREATE_ERROR",
    TaskUpdate = "TASK_UPDATE",
    TaskUpdateError = "TASK_UPDATE_ERROR",
    TaskDelete = "TASK_DELETE",
    TaskDeleteError = "TASK_DELETE_ERROR",
}

export default Actions;
