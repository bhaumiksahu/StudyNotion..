import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";
const rootReducer=combineReducers({
    cart:cartReducer,
    profile:profileReducer,
    auth:authReducer,
    course:courseReducer,
    viewCours:viewCourseReducer,
})
export default rootReducer;