import { GET_CARTG, GET_PRODUCT, GET_ALL_PRODUCTS } from "../consts";
import axios from "axios";
import Swal from "sweetalert";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SIGN_IN = "SIGN_IN";
export const USER_TO_ADMIN = "USER_TO_ADMIN";
export const GET_USER = "GET_USER";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const UPDATE_USER = "UPDATE_USER";
export const VERIFY_PASSWORD = "VERIFY_PASSWORD";
export const ALL_PRODUCTS = "ALL_PRODUCTS";

export function getAllProducts() {
  return function (dispatch) {
    return fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: json.rows,
        });
      });
  };
}

export function agregarAlCarrito(newData, id) {
  return function (dispatch) {
    return axios({
      method: "POST",
      url: `/users/${id}/cart`,
      data: {
        product: newData,
      },
    })
      .then((res) => {
        dispatch({
          type: GET_CARTG,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getProduct(id) {
  return function (dispatch) {
    return axios.get(`/products/${id}`).then((res) => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    });
  };
}

export function postProduct(bodyFormData) {
  return function (dispatch) {
    return axios({
      method: "post",
      url: "/products",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        return response;
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Se creó el producto",
          text: `${res.data.name}`,
        });
        getProduct(res.data.id);
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
    return axios({
      method: "put",
      url: `/products/${id}`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        return response;
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Modificación",
          text: "Se modificó el producto correctamente",
        });
        getProduct(res.data.id);
      })
      .catch(function (response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Completa todos los datos obligatorios",
        });
      });
  };
}

export function addUser(payload, email) {
  var url = "http://localhost:3001/auth/signup";
  return function (dispatch) {
    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({
          type: "ADD_USER",
          payload: response.data,
        });
        if (response.data === "ya existe un usuario con este email") {
          Swal({
            text: "Ya existe un usuario con este email",
            icon: "error",
            timer: "2000",
          });
        } else {
          Swal({
            text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de CodeXpress",
            icon: "success",
            timer: "2000",
          });
        }
      })
      .catch((error) => {
        Swal({
          text: "Ocurrió un error al registrar el usuario",
          icon: "error",
          timer: "2000",
        });
      });
  };
}

export function deleteUsers(payload) {
  var id = payload;
  var url = `http://localhost:3001/users/${id}`;
  return function (dispatch) {
    fetch(url, {
      method: "DELETE",
    })
      // .then(response => response.json())
      .then((json) => {
        dispatch({
          type: "DELETE_USER",
        });
      });
    return Swal({
      text: "Usuario eliminado",
      icon: "success",
      timer: "2000",
    });
  };
}

export const loginUser = (payload) => {
  const pet = axios({
    method: "post",
    url: "http://localhost:3001/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: payload.email,
      password: payload.password,
    },
  });

  pet.then((json) => {
    localStorage.setItem("user", JSON.stringify(json.data));
    Swal({
      text: "Ha iniciado sesión correctamente",
      icon: "success",
      timer: "2000",
    });
  });

  pet.catch((error) => {
    Swal({
      text: "Usuario no encontrado",
      icon: "warning",
      timer: "2000",
    });
    return;
  });
};

export const logoutUser = () => {
  const pet = axios({
    method: "get",
    url: "http://localhost:3001/auth/logout",
  });
  pet.then((json) => {
    localStorage.removeItem("user");
    Swal({
      text: "Se ha cerrado la sesion",
      icon: "success",
      timer: "2000",
    });
  });
  pet.catch((error) => {
    Swal({
      text: "Error",
      icon: "warning",
      timer: "2000",
    });
    return;
  });
};

export function Usertoadmin(id) {
  var payload;

  var url = `http://localhost:3001/Admin/promote/${id}`;

  return function (dispatch) {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "USER_TO_ADMIN",
        });
      });
  };
}

export function getAllUser(id) {
  if (typeof idUser !== "object") {
    return function (dispatch) {
      return fetch(`http://localhost:3001/Admin/search/${id}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "GET_USER",
            payload: json,
          });
        });
    };
  }
}

export function verifyPass(payload) {
  var id = payload.id;

  var url = `http://localhost:3001/users/${id}/passVerify`;
  return function (dispatch) {
    return fetch(`http://localhost:3001/users/${id}/passVerify`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "VERIFY_PASS",
          payload: json,
        });
      });
  };
}

export function ResetPassword(payload) {
  var id = payload.id;
  var url = `http://localhost:3001/users/${id}/passwordReset`;
  return function (dispatch) {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "RESET_PASSWORD",
          payload: json,
        });
        Swal({
          text: "Se cambio la contraseña exitosamente",
          icon: "success",
          timer: "2000",
        });
      });
  };
}

export function UpdateUser(payload) {
  var id = payload.id;
  var url = `http://localhost:3001/users/${id}`;
  return function (dispatch) {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "UPDATE_USER",
        });
      });
  };
}
