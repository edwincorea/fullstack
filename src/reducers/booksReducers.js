"use strict";

//Books Reducers
export const booksReducers = (state={books: []}, action) => {
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