//Cart Reducers
export const cartReducers = (state={cart: []}, action) => {
    switch(action.type) {
    case "ADD_TO_CART":
        return {cart: [...state, ...action.payload]};
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
        
        return {...state, 
            cart: updatedCart
        };
    }             
    case "DELETE_CART_ITEM":
        return {cart: [...state, ...action.payload]};            
    }

    return state;    
};