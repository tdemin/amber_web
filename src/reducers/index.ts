import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { errorReducer } from "./errors";
import { taskReducer } from "./tasks";

const rootReducer = {
    auth: authReducer,
    errors: errorReducer,
    task: taskReducer,
};

export default combineReducers(rootReducer);
