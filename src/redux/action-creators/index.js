const { REACT_APP_BACKEND_HOST } = process.env;


export const setUser = (data) => {
    return {
        type: 'setUser',
        payload: data
    }
}

export const cartTotal = () => {
    return {
        type: 'cartTotal'
    }
}

export const logout = () => {
    return {
        type: 'logout'
    }
}

export const addToCart = (product) => {
    return {
        type: 'addToCart',
        payload: product
    }
}

export const increment = (id) => {
    return {
        type: 'increment',
        payload: id
    }
}

export const decrement = (id) => {
    return {
        type: 'decrement',
        payload: id
    }
}

export const remove = (id) => {
    return {
        type: 'remove',
        payload: id
    }
}

export const clearCart = () => {
    return {
        type: 'clearCart'
    }
}


export const placeOrder = (cart, shipInfo, total_item, total_price) => {
    return async (dispatch) => {
        await fetch(`${REACT_APP_BACKEND_HOST}/api/cart/placeorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
            },
            body: JSON.stringify({ "orderinfo": cart, "shipinfo": shipInfo, "total_qty": total_item, "total_price": total_price })
        });
        dispatch(orderPlaced());
    }
}


export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${REACT_APP_BACKEND_HOST}/api/cart/fetchallorders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                }
            });
            const fetchedOrders = await response.json(); // parses JSON response into native JavaScript objects
            dispatch(ordersFetched(fetchedOrders));
        } catch {
            dispatch(ordersFetched([]));
        }
    }
}


export const cancelOrder = (id) => {
    return async (dispatch) => {
        await fetch(`${REACT_APP_BACKEND_HOST}/api/cart/cancelorder/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
            }
        });
        dispatch(fetchOrders());
    }
}

const orderPlaced = (data) => {
    return {
        type: "orderPlaced",
        payload: data
    }
}

const ordersFetched = (data) => {
    return {
        type: "fetchOrders",
        payload: data
    }
}