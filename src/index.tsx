import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";
import App from "./main";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// See https://bit.ly/CRA-PWA for the list of possible problems.
serviceWorker.register();
