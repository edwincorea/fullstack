
// React
import React from "react";
import {render} from "react-dom";
import { Route, Switch} from "react-router-dom";

import Menu from "./components/menu";
import Footer from "./components/footer";

import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";

// Retrieves components based on status
const Status = ({ code, children }) => {
    return (
        <Route render={({ staticContext }) => {
            if (staticContext)
                staticContext.status = code;
            return children;
        }}/>
    );
};

//NOT-FOUND COMPONENT
const NotFound = () => {
    return (
        <Status code={404}>
            <div>
                <h2> Sorry, cannot find this page</h2>
            </div>
        </Status>
    );
};

const routes = (
    <div>
        <Menu />
        <Switch>
            <Route exact={true} path="/" component={BooksList}/>
            <Route path="/admin" component={BooksForm}/>
            <Route path="/cart" component={Cart}/>
            <Route component={NotFound}/>
        </Switch>
        <Footer />
    </div>
);

export default routes;