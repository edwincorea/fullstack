const initialState = {
    books: [
        {
            _id: 1,
            title: "Learn React in 24h",
            description: "This is the book description",
            price: 33.33
        },
        {
            _id: 2,
            title: "Learn Redux in 24h",
            description: "This is the book description",
            price: 45.00
        }
    ]
};

//Books Reducers
export const booksReducers = (state = initialState, action) => {
    switch(action.type) {
    case "GET_BOOKS":
        return {...state, books: [...state.books]};
    case "POST_BOOK":
        return {books: [...state.books, ...action.payload]};
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