import {
	PUT_PASSWORD,
	CREATE_USER,
	GET_PRODUCT,
	GET_PRODUCTS,
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	GET_PRODUCT_CATEGORY,
	USER_LOGIN,
	GET_USERS,
	DELETE_USER,
	PROMOTE_USER,
	LOGIN_USER,
	GET_ALL_PRODUCTS,
} from '../consts';

const initialState = {
	allProducts: [],
	product: {},
	user: {},
	users: [],
	data: [],
	userLogin: {},
	userLoginData: {},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case PUT_PASSWORD:
			return {
				...state,
				data: action.payload,
			};
		case CREATE_USER:
			return {
				...state,
				data: action.payload,
			};
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.payload,
			};

		case GET_PRODUCT:
			return {
				...state,
				data: action.payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				data: action.payload,
			};
		case DELETE_PRODUCT:
			return {
				...state,
				data: action.payload,
			};
		case EDIT_PRODUCT:
			return {
				...state,
				data: action.payload,
			};
		case GET_PRODUCT_CATEGORY:
			return {
				...state,
				data: action.payload,
			};
		case USER_LOGIN:
			return {
				...state,
				data: action.payload,
			};
		case LOGIN_USER:
			return {
				...state,
				data: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				data: action.payload,
			};
		case DELETE_USER:
			return {
				...state,
				data: state.data.filter((user) => user.id !== action.payload),
			};
		case PROMOTE_USER:
			return {
				...state,
				data: state.data.map((user) => {
					if (user.id === action.payload.id) {
						return (user = action.payload);
					} else {
						return user;
					}
				}),
			};
		default:
			return { ...state };
	}
};

export default rootReducer;
