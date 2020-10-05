import {LOCATION_ACCESSED} from '../actions/types';

const INITIAL_STATE = {
    location:null
}

const userLocationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case LOCATION_ACCESSED:
            return{
                ...state,
                location:action.payload
            }
        default:
            return INITIAL_STATE;
    }
};

export default userLocationReducer