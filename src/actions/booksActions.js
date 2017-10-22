"use strict";

// POST a book
export const postBooks = (books) => ({
    type: "POST_BOOK", 
    payload: books
});


// DELETE a book
export const deleteBook = (id) => ({
    type: "DELETE_BOOK", 
    payload: id
});

// UPDATE a book
export const updateBook = (book) => ({
    type: "UPDATE_BOOK", 
    payload: book
});
