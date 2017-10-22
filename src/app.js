"use strict";

import {createStore} from "redux";
import reducers from "./reducers";

//Step 1: create the store
const store = createStore(
    reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
;

store.subscribe(() => {
    console.log(`Current state is `, store.getState());    
});

//Step 2: create and dispatch actions
store.dispatch({
    type: "POST_BOOK", 
    payload: [
        {
            id: 1,
            title: "This is the book title",
            description: "This is the book description",
            price: 33.33
        },
        {
            id: 2,
            title: "This is the second book title",
            description: "This is the second book description",
            price: 50
        }
    ]
});

// ******* Books actions *******

// add a book
store.dispatch({
    type: "POST_BOOK", 
    payload: [{
        id: 3,
        title: "This is the third book title",
        description: "This is the third book description",
        price: 44
    }]
});

// delete a book
store.dispatch({
    type: "DELETE_BOOK", 
    payload: { id: 1 }
});

// update a book
store.dispatch({
    type: "UPDATE_BOOK", 
    payload: { 
        id: 2,
        title: "Learn React in 24h"
    }
});


// ******* Cart actions *******

// Add to cart
store.dispatch({
    type: "DELETE_BOOK", 
    payload: { id: 1 }
});
