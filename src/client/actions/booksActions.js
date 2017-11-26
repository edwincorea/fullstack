import axios from "axios";

// GET books
export const getBooks = () => {
    return (dispatch) => {
        axios.get("/api/book")
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
        axios.post("/api/book", books)
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

// UPDATE a book
export const updateBook = (id, book) => {
    return (dispatch) => {
        axios.put(`/api/book/${id}`, book)
            .then((response) => {
                dispatch({
                    type: "UPDATE_BOOK",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "UPDATE_BOOK_REJECTED",
                    payload: err
                });
            });
    };
};

// DELETE a book
export const deleteBook = (id) => {
    return (dispatch) => {
        axios.delete(`/api/book/${id}`)
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

// RESET form button
export const resetButton = () => {
    return {
        type:"RESET_BUTTON"
    };
};
  