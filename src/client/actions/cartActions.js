// Add to Cart
export const getCart = () => ({
    type: "GET_CART",
    payload: []
});

export const addToCart = (book) => ({
    type: "ADD_TO_CART", 
    payload: book
});

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
    
    return {
        type: "UPDATE_CART", 
        payload: updatedCart
    };
};

// Delete from Cart
export const deleteCartItem = (cart) => ({
    type: "DELETE_CART_ITEM", 
    payload: cart
});
