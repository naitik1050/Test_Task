import { CONSTANTS } from '../../constants/AppConst';

const initialState = {
    loading:false,
    restaurentList: []
};

const restaurentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.RESTAURENT_GET_REQUEST:
            return { ...state,loading:true };
        case CONSTANTS.RESTAURENT_GET_SUCCESS:
            return { ...state, restaurentList:action.payload.data,loading:false };
        case CONSTANTS.RESTAURENT_GET_SUCCESS:
            return { ...state, loading:false };
    
        default:
            return state;
    }
};

export default restaurentListReducer;
