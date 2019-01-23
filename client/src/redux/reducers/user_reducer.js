import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_USER_CART,
  GET_USER_CART_ITEMS,
  REMOVE_FROM_USER_CART,
  SUCCESS_USER_BUY,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA
} from "./../actions/types"; 

export default function(state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}

        case LOGOUT_USER:
            return {...state}
        
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}

        case AUTH_USER:
            return {...state, userData: action.payload}

        case ADD_TO_USER_CART:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            }

        case REMOVE_FROM_USER_CART:
            return {
                ...state, 
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }

        case GET_USER_CART_ITEMS:
            return {...state, cartDetail: action.payload}

        case SUCCESS_USER_BUY:
            return {
                ...state,
                successBuy: action.payload.success, 
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }

        case UPDATE_USER_DATA:
            return {
                ...state,
                updateUser: action.payload
            }

        case CLEAR_UPDATE_USER_DATA:
            return {
                ...state,
                updateUser: action.payload
            }
    
        default:
            return state;
    }
}