import { fetchLocal } from "../../utils/fetchLocalStorageData";
const userInfo = fetchLocal();

const initialState = userInfo;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUser': { return state = action.payload; }
        case 'logout': {
            localStorage.removeItem('authToken');
            return state = null
        }

        default: return state;
    }
}

export default userReducer;