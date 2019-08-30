import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { errorReducer } from "./errors";

const rootReducer = {
    auth: authReducer,
    errors: errorReducer,
};

export default combineReducers(rootReducer);
