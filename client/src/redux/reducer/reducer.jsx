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
  FILTER_PRODUCTS,
  UPDATE_PRODUCT_LIST,
  RESET_FILTER,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  SET_CART,
} from "../consts";

const initialState = {
  allProducts: [],
  product: {},
  user: {},
  users: [],
  data: [],
  userLogin: {},
  userLoginData: {},
  filteredProducts: [],
  cart: [],
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
    case FILTER_PRODUCTS:
      const { category } = action.payload;
      let filterProduct;
      if (category.length > 0) {
        filterProduct = state.allProducts.filter((product) =>
          category.includes(product.categories[0].name)
        );
      } else {
        filterProduct = state.allProducts;
      }
      return {
        ...state,
        filteredProducts: filterProduct,
      };
    case RESET_FILTER:
      return {
        ...state,
        filteredProducts: [],
      };

    case UPDATE_PRODUCT_LIST:
      console.log("action.payload list:", action.payload);
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT:
    case GET_PRODUCTS:
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
