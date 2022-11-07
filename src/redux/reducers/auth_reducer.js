import { CONSTANTS } from "../../constants";

const initialState = {
    loading: false,
    authStatus:false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SIGNIN_REQUESTED:
        case CONSTANTS.SIGNUP_REQUESTED:
        case CONSTANTS.SIGNOUT_REQUESTED:
            return { ...state, loading: true };

        case CONSTANTS.SIGNIN_SUCCEEDED:
            return { ...state,authStatus:true,loading: false };
        case CONSTANTS.SIGNUP_SUCCEEDED:
        case CONSTANTS.SIGNOUT_SUCCEEDED:
            return { ...state,authStatus:false, loading: false };

        case CONSTANTS.SIGNIN_FAILED:
        case CONSTANTS.SIGNUP_FAILED:
        case CONSTANTS.SIGNOUT_FAILED:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default authReducer;
