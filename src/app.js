"use strict";

import {createStore} from "redux";

//Step 3: define reducers
const reducer = (state={books: []}, action) => {
    switch(action.type) {
        case "POST_BOOK":
            return {books: [...state.books, ...action.payload]};
        case "DELETE_BOOK":
            // Get a copy of current books
            const booksDelete = [...state.books];

            // Get index of book to delete
            const indexDelete = booksDelete.findIndex(
                book => book.id === action.payload.id
            );

            // Use slice to remove the book at indexDelete
            return {books: [
                ...booksDelete.slice(0, indexDelete), 
                ...booksDelete.slice(indexDelete + 1)
            ]};

        case "UPDATE_BOOK":
            // Get a copy of current books
            const booksUpdate = [...state.books];

            // Get index of book to update
            const indexUpdate = booksUpdate.findIndex(
                book => book.id === action.payload.id
            );

            // Create a book object with current book values and new title
            const book = {
                ...booksUpdate[indexUpdate],
                title: action.payload.title
            };

            // log updated book content to console
            console.log("book", book);

            // Use slice to remove the book at indexUpdate,
            // replace it with new book object and concatenate with the rest of books in the array
            return {books: [
                ...booksUpdate.slice(0, indexUpdate), 
                book,  
                ...booksUpdate.slice(indexUpdate + 1)
            ]};
    }

    return state;    
};

//Step 1: create the store
const store = createStore(
    reducer, 
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

// ******* CRUD *******

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
