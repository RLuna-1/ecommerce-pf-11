import { PUT_PASSWORD, CREATE_USER, GET_PRODUCT,  GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT_CATEGORY, USER_LOGIN, GET_USERS, DELETE_USER, PROMOTE_USER, LOGIN_USER } from '../consts/actionTypes';

const initialState = {}

export default function putPassword(state = initialState, action) {
    switch (action.type) {
        case PUT_PASSWORD:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}

export default function createUser(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}

export default function productos(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }
}

export default function productList(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                data: action.payload
            }
            break;
        case DELETE_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        case GET_PRODUCT_CATEGORY:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state };
    }

}

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}

export default function createUser(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}

export default function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                data: action.payload
            }
            break;
        case DELETE_USER: 
            return {
                ...state,
                data: state.data.filter(user => user.id !== action.payload)
            }
            break;
        case PROMOTE_USER:
            return {
                ...state,
                data: state.data.map(user => {
                    if(user.id === action.payload.id){
                        return user = action.payload
                    }else{
                        return user
                    }
                })
            }
        default:
            return { ...state };
    }
}