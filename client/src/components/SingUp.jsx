import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/actions';
import style from '../css/SingUp.module.css';
import { Link } from 'react-router-dom';
import LogoClaro from '../img/LogoClaro.png';
import axios from 'axios';

export function Register(props) {
	const centerRef = useRef(null);

	useEffect(() => {
		if (centerRef.current) {
			centerRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, []);

	const [state, setState] = useState({
		name: '',
		last_name: '',
		email: '',
		password: '',
		phone: null,
	});
	const [errors, setErrors] = useState(null);

	const actualizarEstado = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		if (errors !== null) {
			setErrors(
				validate({
					...state,
					[e.target.name]: e.target.value,
				}),
			);
		}
	};
	const submitUser = async (e) => {
		e.preventDefault();
		const formErrors = validate(state);
		setErrors(formErrors);

		if (Object.keys(formErrors).length === 0) {
			const agregarUser = await props.addUser(state);
			if (agregarUser.success) {
				try {
					const respuesta = await axios.post(
						'/nodemailer/envio-confirmacion',
						{ email: state.email },
					);
					console.log('Correo de confirmación enviado exitosamente');
					if (respuesta.status === 200) {
						setState({
							name: '',
							last_name: '',
							email: '',
							password: '',
							confirmPassword: '',
							phone: '',
						});
					}
				} catch (error) {
					console.error(
						'Error al enviar el correo de confirmación:',
						error,
					);
				}
			}
		}
	};

	return (
		<div ref={centerRef} className={style.General}>
			<div className={style.DivBienvenido}>
				<h1>Bienvenidos a CodeXpress</h1>
				<p>
					Nuestra plataforma de venta de software! Descubre soluciones
					de vanguardia para potenciar tu productividad, seguridad y
					creatividad. Regístrate y lleva tus proyectos al siguiente
					nivel
				</p>
				<div className={style.DivImg}>
					<img src={LogoClaro} alt='Logo' />
				</div>
				<Link to='/'>
					<button>Regresar</button>
				</Link>
			</div>
			<div className={style.Login}>
				<h2>Create tu cuenta</h2>
				<form onSubmit={submitUser}>
					<div>
						<input
							type='text'
							name='name'
							placeholder='Ingrese su nombre'
							onChange={actualizarEstado}
							value={state.name}
							required
						/>
						{errors && errors.name && (
							<p
								id='error'
								className='text-orange-400 text-center'>
								{errors.name}
							</p>
						)}
					</div>
					<div>
						<input
							type='text'
							name='last_name'
							placeholder='Ingrese su apellido'
							onChange={actualizarEstado}
							value={state.last_name}
							required
						/>
						{errors && errors.last_name && (
							<p
								id='error'
								className='text-orange-400 text-center'>
								{errors.last_name}
							</p>
						)}
					</div>
					<div>
						<input

							type='text'
							name='email'
							placeholder='Ingrese su email'
							onChange={actualizarEstado}
							value={state.email}
							required
						/>
						{errors && errors.email && (
							<p
								id='error'
								className='text-orange-400 text-center'>
								{errors.email}
							</p>
						)}
					</div>

					<div>
						<input

							type='password'
							name='password'
							placeholder='Ingrese su contraseña'
							onChange={actualizarEstado}
							value={state.password}
							required
						/>
						{errors && errors.password && (
							<p
								id='error'
								className='text-orange-400 text-center'>
								{errors.password}
							</p>
						)}
					</div>
					<div>
						<input
							type='password'
							name='confirmPassword'
							placeholder='nuevamente su contraseña '
							onChange={actualizarEstado}
							value={state.confirmPassword}
							required
						/>
					</div>
					<div>
						<input

							type='tel'
							name='phone'
							placeholder='Ingrese su Telefono'
							onChange={actualizarEstado}
							value={state.phone}
							maxlength='16'
							minlength='11'
							required
						/>
						{errors && errors.phone && (
							<p
								id='error'
								className='text-orange-400 text-center'>
								{errors.phone}
							</p>
						)}
					</div>
					<div className={style.DivBotones}>
						<Link to='/login'>
							<button>Iniciar Sesion</button>
						</Link>
						<button type='submit' class='btn btn-primary'>
							{' '}
							Registrarse{' '}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		usuarioGuardado: state.usuarios,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		addUser: (title) => dispatch(addUser(title)),
	};
}

export function validate(state) {
	let errors = {};
	if (!state.name) {
		errors.name = 'Nombre es requerido';
	}
	if (!state.last_name) {
		errors.last_name = 'Apellido es requerido';
	}
	if (!state.email) {
		errors.email = 'Email es requerido';
	} else if (!/\S+@\S+\.\S+/.test(state.email)) {
		errors.email = 'Email es invalido';
	}
	if (!state.password) {
		errors.password = 'Contraseña requerida';
	} else if (!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(state.password)) {
		errors.password =
			'la contraseña debe tener al menos una mayúscula y dos números';
	} else if (state.password !== state.confirmPassword) {
		errors.password = 'Contraseña no coincide';
	}
	if (!/^\d{11}$/.test(state.phone)) {
		errors.phone =
			'Un número de teléfono válido debe constar de 11 dígitos Ej.: 9 11 1234 5678';
	}

	return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
