//Cart Reducers
export const cartReducers = (state={cart: []}, action) => {
    switch(action.type) {
    case "ADD_TO_CART":
        return {cart: [...state, ...action.payload]};
    case "DELETE_CART_ITEM":
        return {cart: [...state, ...action.payload]};            
    }

    return state;    
};