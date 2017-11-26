import axios from "axios";

// Add to Cart
export const getCart = () => {
    return (dispatch) => {
        axios.get("/api/cart")
            .then((response) => {
                dispatch({
                    type: "GET_CART",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "GET_CART_REJECTED",
                    msg: "error when getting cart items"
                });
            });
    };    
};

export const addToCart = (cart) => {
    return (dispatch) => {
        axios.post("/api/cart", cart)
            .then((response) => {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "ADD_TO_CART_REJECTED",
                    msg: "error when adding item to cart"
                });
            });
    };
};

// Update to Cart
export const updateCart = (_id, unit, cart) => {    
    // Get a copy of current array of books
    const currentBookToUpdate = cart;
    
    // Get index of book to delete
    const indexToUpdate = currentBookToUpdate.findIndex(
        book => book._id === _id
    );

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };

    const updatedCart = [
        ...currentBookToUpdate.slice(0, indexToUpdate), 
        newBookToUpdate,  
        ...currentBookToUpdate.slice(indexToUpdate + 1)
    ];
   
    return (dispatch) => {
        axios.post("/api/cart", updatedCart)
            .then((response) => {
                dispatch({
                    type: "UPDATE_CART",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "UPDATE_CART_REJECTED",
                    msg: "error when updating cart"
                });
            });
    };    
};

// Delete from Cart
export const deleteCartItem = (cart) => {
    return (dispatch) => {
        axios.post("/api/cart", cart)
            .then((response) => {
                dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: response.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "DELETE_CART_ITEM_REJECTED",
                    msg: "error when deleting item from the cart"
                });
            });
    };    
};
