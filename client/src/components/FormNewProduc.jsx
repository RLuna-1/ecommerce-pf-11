import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import styles from '../css/FormNewProduc.css';

export default function FormNewProduc() {
	const initialValues = {
		title: '',
		description: '',
		image: '',
		marca: '',
		categoria: '',
		stock: '',
		price: '',
	};

	const navigate = useNavigate();

	const onSubmit = (values, { resetForm }) => {
		console.log(values); // Puedes realizar acciones con los valores del formulario aquí

		// Realizar acciones adicionales, si es necesario

		// Redireccionar a la ruta "detail"
		navigate('/detail');

		// Borrar los datos del formulario
		resetForm();
	};

	const validateForm = (values) => {
		const errors = {};
		const regexLettersAndSpaces = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

		// Validar campos obligatorios
		if (!values.title.trim()) {
			errors.title = 'Este campo es obligatorio';
		} else if (!regexLettersAndSpaces.test(values.title.trim())) {
			errors.title = 'El título solo puede contener letras y espacios';
		}
		if (!values.description) {
			errors.description = 'Este campo es obligatorio';
		}
		if (!values.image.trim()) {
			errors.image = 'Este campo es obligatorio';
		} else if (
			!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(values.image.trim())
		) {
			errors.image =
				'La URL de la imagen debe comenzar con http:// o https://';
		}
		if (!values.marca) {
			errors.marca = 'Este campo es obligatorio';
		}
		if (!values.categoria) {
			errors.categoria = 'Este campo es obligatorio';
		}
		if (!values.stock) {
			errors.stock = 'Este campo es obligatorio';
		} else if (isNaN(values.stock) || values.stock <= 0) {
			errors.stock = 'Ingrese un número positivo mayor a cero';
		}
		if (!values.price) {
			errors.price = 'Este campo es obligatorio';
		} else if (isNaN(values.price) || values.price <= 0) {
			errors.price = 'Ingrese un número positivo mayor a cero';
		}

		return errors;
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={validateForm}>
			{({ values, setFieldValue, isValid }) => (
				<Form>
					<div>
						<label htmlFor='title'>Title </label>
						<Field type='text' id='title' name='title' />
						<ErrorMessage name='title' component='div' />
					</div>
					<div>
						<label htmlFor='image'>Imagen </label>
						<Field type='text' id='image' name='image' />
						<ErrorMessage name='image' component='div' />
					</div>
					{values.image.trim() && (
						<div>
							{validateForm(values).image ? (
								<div>URL de imagen inválida</div>
							) : (
								<img src={values.image} alt='Product' />
							)}
						</div>
					)}
					<div>
						<label htmlFor='description'>Description </label>
						<Field
							type='text'
							id='description'
							name='description'
						/>
						<ErrorMessage name='description' component='div' />
					</div>

					<div>
						<label htmlFor='marca'>Marca </label>
						<Field type='text' id='marca' name='marca' />
						<ErrorMessage name='marca' component='div' />
					</div>

					<div>
						<label htmlFor='categoria'>Categoria </label>
						<Field type='text' id='categoria' name='categoria' />
						<ErrorMessage name='categoria' component='div' />
					</div>

					<div>
						<label htmlFor='stock'>Stock </label>
						<Field
							type='number'
							id='stock'
							name='stock'
							min='1'
							step='1'
						/>
						<ErrorMessage name='stock' component='div' />
					</div>

					<div>
						<label htmlFor='price'>Price </label>
						<Field
							type='number'
							id='price'
							name='price'
							min='0'
							step='any'
						/>
						<ErrorMessage name='price' component='div' />
					</div>

					<div>
						<button type='submit' disabled={!isValid}>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
