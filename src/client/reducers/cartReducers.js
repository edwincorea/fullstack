//Cart Reducers
export const cartReducers = (state={cart: []}, action) => {
    switch(action.type) {
    case "GET_CART": {
        const {amount, qty} = calculateTotals(action.payload);
        
        return {...state,
            cart: action.payload,
            totalAmount: amount,
            totalQty: qty
        };
    }
    case "ADD_TO_CART": {
        const {amount, qty} = calculateTotals(action.payload);

        return {...state, 
            cart: action.payload,
            totalAmount: amount,
            totalQty: qty
        };
    }
    case "UPDATE_CART": {        
        const {amount, qty} = calculateTotals(action.payload);

        return {...state, 
            cart: action.payload,
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