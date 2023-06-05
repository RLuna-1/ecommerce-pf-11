import {
	GET_CARTG,
	GET_PRODUCT,
	USER_LOGIN,
	LOGIN_USER,
	GET_ALL_PRODUCTS,
} from '../consts';
import axios from 'axios'
import Swal from 'sweetalert2'


export function getAllProducts() {
	return function (dispatch) {
		return axios
			.get('/products')
			.then((res) => {
				dispatch({
					type: GET_ALL_PRODUCTS,
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
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