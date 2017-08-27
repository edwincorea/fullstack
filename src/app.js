"use strict";

import {createStore} from "redux";

//Step 1: define reducers
const reducer = (state=0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + action.payload;
            break;
        case "DECREMENT":
            return state + action.payload;
            break;            
    }

    return state;    
};

//Step 2: create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`Current state is ${store.getState()}`);
});

//Step 3: create and dispatch action
store.dispatch({type: "INCREMENT", payload: 1});
store.dispatch({type: "INCREMENT", payload: 1});
store.dispatch({type: "DECREMENT", payload: 1});

