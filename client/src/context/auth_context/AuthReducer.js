import { Action } from 'history';
import * as ActionTypes from '../ContextActions';

export default (state, action) => {
    switch(action.type){

        case ActionTypes.REGISTER_FAIL:
        case ActionTypes.LOGIN_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                toast: action.payload,
                currentUser: null,
                token: null,
                isAuthenticated: false
            }

        case ActionTypes.AUTH_ERROR:
            return{
                ...state,
                toast: action.payload
            }
        
        case ActionTypes.LOGOUT:
            localStorage.removeItem('token', action.payload)
            return{
                ...state,
                token: null,
                currentUser: null,
                isAuthenticated: false
            }

        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return{
                ...state,
                isAuthenticated: true
            } 

        case ActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }

        case ActionTypes.CLEAR_ERRORS:
            return{
                ...state,
                toast: null
            }

        default:
            return state;
    }
}