import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "task"],
};

const composeEnhancer = composeWithDevTools({});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
