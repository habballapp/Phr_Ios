const INITIAL_STATE = {
    urgentcaredata:null
}
const getDataReducer = (state=INITIAL_STATE, action) => {
    console.log("data reducer", action);
    switch(action.type){
        case 'data_accessed':
            return{
                ...state,
                urgentcaredata:action.payload
            }
        default:
            return INITIAL_STATE;
    }
};

export default getDataReducer