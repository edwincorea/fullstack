// React
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import Menu from "./components/menu";
import Footer from "./components/footer";
import BooksList from "./components/pages/booksList";

import {createStore, applyMiddleware, compose} from "redux";
import logger from "redux-logger";

import reducers from "./reducers";

//Step 1: create the store
const middleware = applyMiddleware(logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers, 
    composeEnhancers(middleware)
);

render(
    <Provider store={store}>
        <div>
            <Menu />
            <BooksList />
            <Footer />
        </div>        
    </ Provider>, document.getElementById("app")
);