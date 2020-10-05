import { combineReducers } from 'redux';
import getDataReducer from './getDataReducer'
import userLocationReducer from "./getLocationReducer";

export default combineReducers({
    data: getDataReducer,
    userLocation: userLocationReducer
})