import {SET_REGISTER_BOOL} from '../actionTypes';

export const DEFAULT_STATE = {
    allClear: false,
    
};

export default (state = DEFAULT_STATE , action) => {
    switch(action.type){
        case  SET_REGISTER_BOOL: return {
        allClear: action.bool,
        };
        default : return state;
    }
}