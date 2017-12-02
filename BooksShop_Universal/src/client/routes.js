
// React
import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";

import Menu from "./components/menu";
import Footer from "./components/footer";

const routes = (
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
);

export default routes;