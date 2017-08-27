"use strict";

import {createStore} from "redux";

//Step 1: define reducers
const reducer = (state={}, action) => {
    switch(action.type) {
        case "POST_BOOK":
            return state = action.payload;
            break;
    }

    return state;    
};

//Step 2: create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`Current state is `, store.getState());
    console.log(`Currentprice is `, store.getState().price);
});

//Step 3: create and dispatch action
store.dispatch({
    type: "POST_BOOK", 
    payload: {
        id: 1,
        title: "This is the book title",
        description: "This is the book description",
        price: 33.33
    }
});