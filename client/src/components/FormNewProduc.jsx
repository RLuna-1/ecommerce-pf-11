import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function FormNewProduc() {
	const initialValues = {
		title: '',
		description: '',
		image: '',
		marca: '',
		category: '',
		price: '',
	};

	const navigate = useNavigate();

	const onSubmit = (values, { resetForm }) => {
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
		if (!values.category) {
			errors.category = 'Este campo es obligatorio';
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
				<Form className='max-w-md mx-auto mt-10'>
					<div className='mb-4'>
						<label htmlFor='title' className='block mb-2 font-sans'>
							Title
						</label>
						<Field
							type='text'
							id='title'
							name='title'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='title'
							component='div'
							className='text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='image' className='block mb-2'>
							Imagen
						</label>
						<Field
							type='text'
							id='image'
							name='image'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='image'
							component='div'
							className='text-red-500'
						/>
					</div>
					{values.image.trim() && (
						<div>
							{validateForm(values).image ? (
								<div className='text-red-500'>
									URL de imagen inválida
								</div>
							) : (
								<img
									src={values.image}
									alt='Product'
									className='w-32 h-32 mx-auto mt-4'
								/>
							)}
						</div>
					)}
					<div className='mb-4'>
						<label htmlFor='description' className='block mb-2'>
							Description
						</label>
						<Field
							type='text'
							id='description'
							name='description'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='description'
							component='div'
							className='text-red-500'
						/>
					</div>

					<div className='mb-4'>
						<label htmlFor='marca' className='block mb-2'>
							Marca
						</label>
						<Field
							type='text'
							id='marca'
							name='marca'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='marca'
							component='div'
							className='text-red-500'
						/>
					</div>

					<div className='mb-4'>
						<label htmlFor='category' className='block mb-2'>
							Categoria
						</label>
						<Field
							type='text'
							id='category'
							name='category'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='category'
							component='div'
							className='text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='price' className='block mb-2'>
							Price
						</label>
						<Field
							type='number'
							id='price'
							name='price'
							min='1'
							step='any'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='price'
							component='div'
							className='text-red-500'
						/>
					</div>

					<div>
						<button
							type='submit'
							disabled={!isValid}
							className='bg-[#6F47EB] hover:bg-[#4c1d95] text-white font-bold py-2 px-4 rounded'>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
