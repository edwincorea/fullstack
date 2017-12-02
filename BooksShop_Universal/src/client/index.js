// React
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import {applyMiddleware, compose, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// Import combined reducers
import reducers from "./reducers";

//Step 1: create the store
const middleware = applyMiddleware(thunk, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// We will pass initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(
    reducers, 
    initialState,
    composeEnhancers(middleware)
);

import routes from "./routes";
const Root = (
    <Provider store={store}>
        {routes}
    </Provider>
);

render(Root, document.getElementById("app"));