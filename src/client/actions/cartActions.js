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
export const updateCart = (_id, unit) => ({
    type: "UPDATE_CART", 
    _id,
    unit 
});

// Delete from Cart
export const deleteCartItem = (cart) => ({
    type: "DELETE_CART_ITEM", 
    payload: cart
});
