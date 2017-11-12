// Add to Cart
export const addToCart = (book) => ({
    type: "ADD_TO_CART", 
    payload: book
});

// Delete from Cart
export const deleteCartItem = (cart) => ({
    type: "DELETE_CART_ITEM", 
    payload: cart
});
