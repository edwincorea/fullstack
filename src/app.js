"use strict";

import {createStore} from "redux";

//Step 1: define reducers
const reducer = (state=[], action) => {
    switch(action.type) {
        case "POST_BOOK":
        let books = state.concat(action.payload);
        return state = books;
        break;
    }

    return state;    
};

//Step 2: create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`Current state is `, store.getState());    
});

//Step 3: create and dispatch actions
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

store.dispatch({
    type: "POST_BOOK", 
    payload: {
        id: 3,
        title: "This is the third book title",
        description: "This is the third book description",
        price: 44
    }
});
