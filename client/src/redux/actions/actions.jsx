import {
	GET_CARTG,
	GET_PRODUCT,
	USER_LOGIN,
	GET_ALL_PRODUCTS,
	FILTER_PRODUCTS,
} from '../consts';
import axios from 'axios';
import Swal from 'sweetalert2';

export const ADD_USER = 'ADD_USER';

export function getAllProducts() {
	return function (dispatch) {
		return fetch('http://localhost:3001/products')
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				dispatch({
					type: GET_ALL_PRODUCTS,
					payload: json.rows,
				});
			});
	};
}

export function filterProducts() {
	return function (dispatch) {
		return fetch('http://localhost:3001/products')
			.then((response) => response.json())
			.then((json) => {
				const categories = json.rows.map(
					(product) => product.categories[0].name,
				);
				console.log('filter', categories);
				dispatch({
					type: FILTER_PRODUCTS,
					payload: categories,
				});
			});
	};
}

export function agregarAlCarrito(newData, id) {
	return function (dispatch) {
		return axios({
			method: 'POST',
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
			method: 'post',
			url: '/products',
			data: bodyFormData,
			config: { headers: { 'Content-Type': 'multipart/form-data' } },
		})
			.then(function (response) {
				return response;
			})
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'Se creó el producto',
					text: `${res.data.name}`,
				});
				getProduct(res.data.id);
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: `${err}`,
				});
			});
	};
}

export function editProduct(bodyFormData, id) {
	return function (dispatch) {
		return axios({
			method: 'put',
			url: `/products/${id}`,
			data: bodyFormData,
			config: { headers: { 'Content-Type': 'multipart/form-data' } },
		})
			.then(function (response) {
				return response;
			})
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'Modificación',
					text: 'Se modificó el producto correctamente',
				});
				getProduct(res.data.id);
			})
			.catch(function (response) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Completa todos los datos obligatorios',
				});
			});
	};
}

export function postLogin(data) {
	return function (dispatch) {
		return axios({
			method: 'POST',
			url: `/auth/login`,
			data: data,
		}).then((res) => {
			dispatch({
				type: USER_LOGIN,
				payload: res.data.token,
			});
		});
	};
}

export const loginUser = (payload) => {
	const pet = axios({
		method: 'post',
		url: 'http://localhost:3000/auth/login',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			email: payload.email,
			password: payload.password,
		},
	});

	pet.then((json) => {
		localStorage.setItem('user', JSON.stringify(json.data));
		Swal({
			text: 'Ha iniciado sesión correctamente',
			icon: 'success',
			timer: '2000',
		});
	});

	pet.catch((error) => {
		Swal({
			text: 'Usuario no encontrado',
			icon: 'warning',
			timer: '2000',
		});
		return;
	});
};

export function addUser(payload, email) {
	var url2 = `http://localhost:3000/users/${payload.email}`;

	return function (dispatch) {
		fetch(url2)
			.then((response) => response.json())
			.then((response) => {
				dispatch({
					type: ADD_USER,
					payload: response,
				});
				if (response === 'ya existe un usuario con este email') {
					return Swal({
						text: 'Ya existe un usuario con este email',
						icon: 'error',
						timer: '2000',
					});
				} else {
					var url = 'http://localhost:3000/users';
					fetch(url, {
						method: 'POST',
						body: JSON.stringify(payload),
						headers: {
							'Content-Type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((json) => {
							dispatch({
								type: ADD_USER,
								payload: json,
							});
						});
					return Swal({
						text: 'Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de HenrySport',
						icon: 'success',
						timer: '2000',
					});
				}
			});
	};
}
