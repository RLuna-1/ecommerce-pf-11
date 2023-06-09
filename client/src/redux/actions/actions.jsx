import {
  GET_CARTG,
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  FILTER_PRODUCTS,
  RESET_FILTER,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  SET_CART,
  SET_CURRENT_PAGE,
  SET_PRODUCTS_PER_PAGE,
} from "../consts";
import axios from "axios";
import Swal from "sweetalert2";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SIGN_IN = "SIGN_IN";
export const USER_TO_ADMIN = "USER_TO_ADMIN";
export const GET_USER = "GET_USER";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const UPDATE_USER = "UPDATE_USER";
export const VERIFY_PASSWORD = "VERIFY_PASSWORD";
export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const ADD_ONE_FROM_CART = "ADD_ONE_FROM_CART";

const URL = 'http://localhost:3001'

export function getAllProducts(page) {
  return function (dispatch) {
    return axios.get(`${URL}/products?page=${page}`).then((response) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data.rows,
      });
    }).catch((err) => {
      Swal.fire({
        icon: "error",
          title: "Oops...",
          text: "Ya no quedan mas productos",
          timer: "2000",
      });
    });
  };
}

export function agregarAlCarrito(newData, id) {
  return function (dispatch) {
    return axios
      .post(`${URL}/users/${id}/cart`, {
        product: newData,
      })
      .then((res) => {
        dispatch({
          type: GET_CARTG,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };
}

export function getProduct(id) {
  return function (dispatch) {
    return axios
      .get(`${URL}/products/${id}`)
      .then((res) => {
        dispatch({
          type: GET_PRODUCT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };
}

export function postProduct(bodyFormData) {
  return function (dispatch) {
    return axios
      .post(`${URL}/products`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Se creó el producto",
          text: `${res.data.name}`,
        });
        getProduct(res.data.id)(dispatch);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
        });
      });
  };
}

export function editProduct(bodyFormData, id) {
  return function (dispatch) {
    return axios
      .put(`${URL}/products/${id}`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Modificación",
          text: "Se modificó el producto correctamente",
        });
        getProduct(res.data.id)(dispatch);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Completa todos los datos obligatorios",
        });
      });
  };
}

export function addUser(payload, email) {
  var url = URL + "/auth/signup";
  return function (dispatch) {
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: ADD_USER,
          payload: response.data,
        });
        if (response.data === "ya existe un usuario con este email") {
          Swal.fire({
            text: "Ya existe un usuario con este email",
            icon: "error",
            timer: "2000",
          });
        } else {
          Swal.fire({
            text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de CodeXpress",
            icon: "success",
            timer: "2000",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "Ocurrió un error al registrar el usuario",
          icon: "error",
          timer: "2000",
        });
      });
  };
}

export function deleteUsers(payload) {
  var id = payload;
  var url = `${URL}/users/${id}`;
  return function (dispatch) {
    axios
      .delete(url)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
        });
      })
      .then(() => {
        Swal.fire({
          text: "Usuario eliminado",
          icon: "success",
          timer: "2000",
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
}

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(
      `${URL}/auth/login`,
      {
        email: payload.email,
        password: payload.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    Swal.fire({
      text: "Ha iniciado sesión correctamente",
      icon: "success",
      timer: "2000",
    });
    return true;
  } catch (error) {
    Swal.fire({
      text: "Usuario no encontrado",
      icon: "warning",
      timer: "2000",
    });
    return false;
  }
};


export const logoutUser = () => {
  return function (dispatch) {
    axios
      .get(`${URL}/auth/logout`)
      .then((response) => {
        localStorage.removeItem("user");
        Swal.fire({
          text: "Se ha cerrado la sesión",
          icon: "success",
          timer: "2000",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: "Error",
          icon: "warning",
          timer: "2000",
        });
      });
  };
};

export function Usertoadmin(id) {
  var payload;
  var url = `${URL}/Admin/promote/${id}`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: USER_TO_ADMIN,
        });
      })
      .catch((error) => {
        console.error("Error promoting user to admin:", error);
      });
  };
}

export function getAllUser(id) {
  if (typeof idUser !== "object") {
    return function (dispatch) {
      axios
        .get(`${URL}/Admin/search/${id}`)
        .then((response) => {
          dispatch({
            type: GET_USER,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    };
  }
}

export function verifyPass(payload) {
  var id = payload.id;
  return function (dispatch) {
    axios
      .get(`${URL}/users/${id}/passVerify`)
      .then((response) => {
        dispatch({
          type: VERIFY_PASSWORD,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error verifying password:", error);
      });
  };
}

export function ResetPassword(payload) {
  var id = payload.id;
  var url = `${URL}/users/${id}/passwordReset`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: RESET_PASSWORD,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
  };
}

export function updateUser(payload) {
  var id = payload.id;
  var url = `${URL}/users/${id}`;
  return function (dispatch) {
    axios
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
}

export function filterProducts(category) {
  return {
    type: FILTER_PRODUCTS,
    payload: {
      category: category,
    },
  };
}

export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};

export function addToCarta(payload) {
  try {
    Swal.fire({
      text: "Se ha agregado el producto",
      icon: "success",
      timer: 1100,
    });

    return {
      type: ADD_TO_CART,
      payload,
    };
  } catch {
    Swal.fire({
      text: "Error al agregar el producto",
      icon: "warning",
      timer: 2000,
    });
  }
}


export function remove1FromCart(payload) {
  return {
    type: REMOVE_ONE_FROM_CART,
    payload,
  };
}
export function sume1FromCart(payload) {
  return {
    type: ADD_ONE_FROM_CART,
    payload,
  };
}
export function removeFromCart(payload) {
  return {
    type: REMOVE_ALL_FROM_CART,
    payload,
  };
}

export const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: cart,
  };
};

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: parseInt(page),
  };
}

export function setProductsPerPage(count) {
  return {
    type: SET_PRODUCTS_PER_PAGE,
    payload: count,
  };
}
