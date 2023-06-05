import {
	GET_CARTG,
	GET_PRODUCT,
	USER_LOGIN,
	LOGIN_USER,
	// GET_ALL_PRODUCTS,
} from '../consts';
import axios from 'axios'
import Swal from 'sweetalert2'
export const ADD_USER = 'ADD_USER';
export const ALL_PRODUCTS = 'ALL_PRODUCTS';


export function getAllProducts() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'ALL_PRODUCTS',
                    payload: json
                });
            });
    }
}
export default function agregarAlCarrito(newData,id) {
    return function (dispatch) {
        return  axios({
            method: 'POST',
            url: `/users/${id}/cart`,
            data: {
                product: newData
            }
        }).then(res => {
            dispatch({
                type: GET_CARTG,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}


export function getProduct(id) {
    return function (dispatch) {
        return axios.get(`/products/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            })

    };

}

export function postProduct(bodyFormData) {
    return function (dispatch) {
        return axios({
            method: 'post',
            url: '/products',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                return (response)
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Se creo el producto',
                    text: `${res.data.name}`,
                })
                getProduct(res.data.id)


            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err}`,
                })
            })

    };
}

export function editProduct(bodyFormData, id) {
    return function (dispatch) {
        return axios({
            method: 'put',
            url: `/products/${id}`,
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                return (response)
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Modificación',
                    text: `Se modificó el producto correctamente`,
                })
                getProduct(res.data.id)

            })
            .catch(function (response) {
                //handle error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Completa todos los datos obligatorios`,
                })
            });

    };

}
export function postLogin (data) {
    return function(dispatch) {
        return axios({
            method: 'POST',
            url: `/auth/login`,
            data: data

        })
            .then(res => {
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data.token
                })
            }
            );

    };
}
export function loginUser(loginData) {
    // console.log("esta es la data que llega al actions", loginData)
    return function (dispatch) {
        axios({
            method: 'POST',
            url: `/auth/login`,
            data: {
                email: loginData.email,
                password: loginData.password,
            }
        })
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                })
                return res;
            })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('statusToken', 'Usted está autorizado correctamente!')
                window.location.assign("http://localhost:3000/checkuser/auth/login")
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los datos ingresados son erroneos',
                })
            })
    }
}
export function addUser(payload, email) {

    var url2 = `http://localhost:3000/users/${payload.email}`

    return function (dispatch) {
        fetch(url2).then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    payload: response
                });
                if (response === "ya existe un usuario con este email") {
                    return Swal({
                        text: "Ya existe un usuario con este email",
                        icon: "error",
                        timer: "2000",
                    });
                } else {
                    var url = 'http://localhost:3000/users';
                    fetch(url, {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(payload),
                        // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(json => {
                            dispatch({
                                type: 'ADD_USER',
                                payload: json
                            });
                        });
                    return Swal({
                        text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de HenrySport",
                        icon: "success",
                        timer: "2000",
                    });;

                }
            })
    }


}