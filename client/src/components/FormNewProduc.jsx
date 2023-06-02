import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import FormULRValidate from '../utils/FormULRValidate';
import FormValidationsShema from '../utils/FormValidationsShema';

export default function FormNewProduc() {
	const navigate = useNavigate();

	const initialValues = {
		title: '',
		description: '',
		image: '',
		marca: '',
		category: '',
		price: '',
	};

	const onSubmit = (values, { resetForm }) => {
		// Redireccionar a la ruta "detail"
		navigate('/detail');
		// Borrar los datos del formulario
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={FormValidationsShema}>
			{({ values, setFieldValue, isValid }) => (
				<Form className='max-w-md mx-auto mt-10 mb-10'>
					<div className='mb-4'>
						<label htmlFor='title' className='block mb-2 font-sans'>
							Titulo
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
							{FormULRValidate(values).image ? (
								<div className='text-red-500'>
									URL de imagen inválida
								</div>
							) : (
								<img
									src={values.image}
									alt='Product'
									className='w-full object-cover mx-auto mt-4'
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
							Precio
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

					<div className='flex justify-center'>
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
