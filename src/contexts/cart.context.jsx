import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(
        ( cartItem ) => {
            return cartItem.id === productToAdd.id;
        }
    );

    if (existingCartItem) {
        return cartItems.map(
            (cartItem) => 
                cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1}:
                cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}];

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    
    const existingCartItem = cartItems.find(
        ( cartItem ) => {
            return cartItem.id === cartItemToRemove.id;
        }
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            cartItem => cartItem.id !== cartItemToRemove.id 
        );
    };

    if (existingCartItem) {
        return cartItems.map(
            (cartItem) => 
                cartItem.id === cartItemToRemove.id ?
                {...cartItem, quantity: cartItem.quantity - 1}:
                cartItem
        )
    };

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(
        cartItem => cartItem.id !== cartItemToClear.id 
    );
}

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN'
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0, 
    cartCount: 0,

});

const cartReducer = (state, action) => {

    const {type, payload} = action;

    switch(type) {
        case 'SET_CART_ITEMS': 
            return {
                ...state,
                ...payload
            }    
        case 'SET_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload
            }
        default: 
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }

}

const INITIAL_STATE = {
    cartTotal: 0, 
    cartCount: 0,
    isCartOpen: false,
    cartItems: [], 
}

export const CartProvider = ({children}) => {
 
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount 
            }
        })
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            {type: CART_ACTION_TYPES.SET_CART_OPEN,
            payload: bool}
        )
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}