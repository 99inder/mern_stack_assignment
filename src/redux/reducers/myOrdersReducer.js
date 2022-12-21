const initialState = [];

const myOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'fetchOrders': { 
            return state = action.payload 
        }

        default: return state;
    }
}

export default myOrdersReducer;