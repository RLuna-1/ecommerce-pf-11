import {
  PUT_PASSWORD,
  CREATE_USER,
  GET_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT_CATEGORY,
  USER_LOGIN,
  GET_USERS,
  DELETE_USER,
  PROMOTE_USER,
  LOGIN_USER,
  RESET_FILTER,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  SET_CART,
  GET_CATEGORY_ROUTE,
  SET_PRODUCTS,
  SET_FILTERS,
  SET_CATEGORIES,
  ADD_PRODUCT
} from "../consts";

const initialState = {
  products: [],
  countProducts: 0,
  filters: {
    name: "",
    quantity: null,
    quantitygte: null,
    quantitylte: null,
    price: null,
    pricegte: null,
    pricelte: null,
    categories: [],
    order: "",
    direction: "",
    page: 1,
    platforms: [],
    licenses: [],
  },
  categories: [],
  product: {},
  user: {},
  users: [],
  data: [],
  userLogin: {},
  userLoginData: {},
  cart: [],
  categoryRoute: [],
  newProduct: []
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
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.rows,
        countProducts: action.payload.count,
      };
    case SET_FILTERS:
      return { ...state, filters: action.payload };
	  case SET_CATEGORIES:
		return {
		  ...state,
		  categories: action.payload,
		};

    case ADD_PRODUCT:
        return {
            ...state,
            allProducts: [...state.allProducts, action.payload],
            newProduct: action.payload
        }

    case RESET_FILTER:
      return {
        ...state,
        filteredProducts: [],
      };

    case GET_PRODUCT:
    case DELETE_PRODUCT:
    case EDIT_PRODUCT:
    case GET_PRODUCT_CATEGORY:
    case USER_LOGIN:
    case LOGIN_USER:
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
    case ADD_TO_CART: {
      let newItem = state.allProducts.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }

    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }

    case REMOVE_ALL_FROM_CART: {
      const updatedCartItems = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCartItems,
      };
    }

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
