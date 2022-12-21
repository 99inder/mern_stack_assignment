import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import myOrdersReducer from "./myOrdersReducer";

const rootReducer = combineReducers({
    userReducer,
    cartReducer,
    myOrdersReducer,
});

export default rootReducer;