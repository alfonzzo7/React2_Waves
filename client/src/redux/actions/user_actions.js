import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from './../../components/utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_USER_CART,
  GET_USER_CART_ITEMS,
  REMOVE_FROM_USER_CART,
  SUCCESS_USER_BUY,
  UPDATE_USER_DATA
} from "./types";

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);
    
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function authUser() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);
    
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function addToUserCart(_id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data);
    
    return {
        type: ADD_TO_USER_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
        userCart.forEach(item => {
            response.data.forEach((prod, i) => {
                if (item.id === prod._id) {
                    response.data[i].quantity = item.quantity;
                }
            });
        });
        
        return response.data
    });
    
    return {
        type: GET_USER_CART_ITEMS,
        payload: request
    }
}

export function removeFromUserCart(_id) {
    const request = axios.get(`${USER_SERVER}/removeFromCart?productId=${_id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((prod, i) => {
                    if (item.id === prod._id) {
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                });
            });

            return response.data;
        });
    
    return {
        type: REMOVE_FROM_USER_CART,
        payload: request
    }
}

export function successUserBuy(data) {
    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: SUCCESS_USER_BUY,
        payload: request
    }
}

export function updateUserData(data) {
    const request = axios.post(`${USER_SERVER}/updateProfile`, data)
        .then(response => response.data);

    return {
        type: UPDATE_USER_DATA,
        payload: request
    }
}