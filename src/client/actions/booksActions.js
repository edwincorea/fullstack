import axios from "axios";

// GET books
export const getBooks = () => ({
    type: "GET_BOOKS"
});

// POST a book
export const postBooks = (books) => {
    return (dispatch) => {
        axios.post("/book", books)
            .then((response) => {
                dispatch({
                    type: "POST_BOOK",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "POST_BOOK_REJECTED",
                    payload: "There was an error while posting a new book"
                });
            });
    };
};


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
