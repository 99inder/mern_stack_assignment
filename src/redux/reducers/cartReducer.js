import { totalQty, totalPrice } from "../../utils/total.js";
const localcart = JSON.parse(localStorage.getItem('cart'));

const initialState = {
    cart: localcart ? localcart : [],
    total_item: totalQty(localcart),
    total_price: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'cartTotal': {
            return {
                ...state,
                total_item: totalQty(state.cart),
                total_price: totalPrice(state.cart)
            }
        }

        case 'addToCart': {

            const product = action.payload;
            let existingProduct = state.cart.find((curElem) => curElem.id === product.id);

            if (existingProduct) {
                let updatedCart = state.cart.map(curElem => {
                    if (curElem.id === product.id) {
                        let newqty = curElem.qty + 1;
                        return {
                            ...curElem,
                            qty: newqty,
                        };
                    } else {
                        return curElem
                    }
                })
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                return {
                    ...state,
                    cart: updatedCart,
                    total_item: totalQty(updatedCart),
                    total_price: totalPrice(updatedCart)
                }
            } else {

                const cartProduct = {
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    desc: product.desc,
                    price: product.price,
                    qty: 1
                }

                localStorage.setItem('cart', JSON.stringify([...state.cart, cartProduct]));

                return {
                    ...state,
                    cart: [...state.cart, cartProduct],
                    total_item: totalQty([...state.cart, cartProduct]),
                    total_price: totalPrice([...state.cart, cartProduct])
                };
            }
        }

        case 'remove': {

            let updatedCart = state.cart.filter(curElem => curElem.id !== action.payload)
            updatedCart.length !== 0 ? localStorage.setItem('cart', JSON.stringify(updatedCart)) : localStorage.removeItem('cart');
            return {
                ...state,
                cart: updatedCart,
                total_item: totalQty(updatedCart),
                total_price: totalPrice(updatedCart)
            };
        }

        case 'increment': {
            let updatedCart = state.cart.map(curElem => {
                if (curElem.id === action.payload) {
                    let newqty = curElem.qty + 1;
                    return {
                        ...curElem,
                        qty: newqty,
                    };
                } else {
                    return curElem
                }
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
                total_item: totalQty(updatedCart),
                total_price: totalPrice(updatedCart)
            }
        }

        case 'decrement': {
            let updatedCart = state.cart.map(curElem => {
                if (curElem.id === action.payload) {
                    let newqty = curElem.qty - 1;
                    if (newqty <= 1) {
                        newqty = 1;
                    }
                    return {
                        ...curElem,
                        qty: newqty,
                    };
                } else {
                    return curElem
                }
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
                total_item: totalQty(updatedCart),
                total_price: totalPrice(updatedCart)
            }
        }

        case 'clearCart': {
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: [],
                total_item: 0,
                total_price: 0,
            }
        }

        case 'orderPlaced': {
            return state;
        }

        default: return state;
    }
}

export default cartReducer;