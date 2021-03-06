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
const store = createStore(
    reducers, 
    composeEnhancers(middleware)
);

import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from "./components/menu";
import Footer from "./components/footer";

const Root = (
    <Provider store={store}>
        <Router>
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={BooksList}/>
                    <Route path="/admin" component={BooksForm}/>
                    <Route path="/cart" component={Cart}/>
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>
);

render(Root, document.getElementById("app"));