import { updateCart } from "../actions/cartActions";

//Cart Reducers
export const cartReducers = (state={cart: []}, action) => {
    switch(action.type) {
    case "ADD_TO_CART": {
        const {amount, qty} = calculateTotals(action.payload);

        return {...state, 
            cart: action.payload,
            totalAmount: amount,
            totalQty: qty
        };
    }
    case "UPDATE_CART": {
        // Get a copy of current array of books
        const currentBookToUpdate = [...state.cart];
        
        // Get index of book to delete
        const indexToUpdate = currentBookToUpdate.findIndex(
            book => book._id === action._id
        );

        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
        };

        const updatedCart = [
            ...currentBookToUpdate.slice(0, indexToUpdate), 
            newBookToUpdate,  
            ...currentBookToUpdate.slice(indexToUpdate + 1)
        ];
        
        const {amount, qty} = calculateTotals(updatedCart);

        return {...state, 
            cart: updatedCart,
            totalAmount: amount,
            totalQty: qty
        };
    }             
    case "DELETE_CART_ITEM": {
        const {amount, qty} = calculateTotals(action.payload);

        return {
            ...state,
            cart: action.payload,
            totalAmount: amount,
            totalQty: qty
        };
    }}

    return state;    
};

//Calculate totals
const calculateTotals = (payload) => {
    const totalAmount = payload.map((cartItem) => {
        return cartItem.price * cartItem.quantity; 
    }).reduce((acc, val) => {
        return acc + val;
    }, 0);

    const totalQty = payload.map((qty) => {
        return qty.quantity;
    }).reduce((acc, val) => {
        return acc + val;
    }, 0);

    return {
        amount: totalAmount.toFixed(2),
        qty: totalQty
    };
};