import axios from "axios";

// GET books
export const getBooks = () => {
    return (dispatch) => {
        axios.get("/book")
            .then((response) => {
                dispatch({
                    type: "GET_BOOKS",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "GET_BOOKS_REJECTED",
                    payload: err      
                });
            });
    };
};

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
export const deleteBook = (id) => {
    return (dispatch) => {
        axios.delete(`book/${id}`)
            .then((response) => {
                dispatch({
                    type: "DELETE_BOOK",
                    payload: id
                });
            })
            .catch((err) => {
                dispatch({
                    type: "DELETE_BOOK_REJECTED",
                    payload: err
                });
            });
    };
};

// UPDATE a book
export const updateBook = (book) => ({
    type: "UPDATE_BOOK", 
    payload: book
});
