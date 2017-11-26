
//Books Reducers
export const booksReducers = (state = {
    books:[]
}, action) => {
    switch(action.type) {
    case "GET_BOOKS":
        return {...state, books: [...action.payload]};
    case "POST_BOOK":
        return {...state, books: [...state.books, ...action.payload], msg: "Saved! Click to continue.", style: "success"};
    case "POST_BOOK_REJECTED":
        return {...state, msg: "Please, try again.", style: "danger"};        
    case "RESET_BUTTON":
        return {...state, msg: null, style: "primary"};                
    case "DELETE_BOOK": {
        // Get a copy of current books
        const booksDelete = [...state.books];

        // Get index of book to delete
        const indexToDelete = booksDelete.findIndex(
            book => book._id.toString() === action.payload //payload holds the actual id
        );

        // Use slice to remove the book at indexDelete
        return {books: [
            ...booksDelete.slice(0, indexToDelete), 
            ...booksDelete.slice(indexToDelete + 1)
        ]};
    }
    case "UPDATE_BOOK": {
        // Get a copy of current books
        const booksUpdate = [...state.books];

        // Get index of book to update
        const indexToUpdate = booksUpdate.findIndex(
            book => book._id === action.payload._id
        );

        // Create a book object with current book values and new title
        const book = {
            ...booksUpdate[indexToUpdate],
            title: action.payload.title
        };

        // Use slice to remove the book at indexToUpdate,
        // replace it with new book object and concatenate with the rest of books in the array
        return {books: [
            ...booksUpdate.slice(0, indexToUpdate), 
            book,  
            ...booksUpdate.slice(indexToUpdate + 1)
        ]};    
    }}

    return state;    
};