import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormULRValidate from '../utils/FormULRValidate';
import FormValidationsShema from '../utils/FormValidationsShema';
import {
	addProduct,
	fetchCategories,
	setCategories,
} from '../redux/actions/actions';
import Swal from 'sweetalert2';
import '../css/index.css';

export default function FormNewProduct() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories) || [];

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const initialValues = {
		name: '',
		description: '',
		image: '',
		quantity: '',
		price: '',
		categories: [],
		platforms: [],
		licenses: [],
	};
	//se cambia initialValues por categories
	const onSubmit = async (values, { resetForm }) => {
		try {
			// Convert categories to an array if it's not already
			const updatedValues = {
				...values,
				categories: Array.isArray(values.categories)
					? values.categories
					: [values.categories],
				platforms: Array.isArray(values.platforms)
					? values.platforms
					: [values.platforms],
				licenses: Array.isArray(values.licenses)
					? values.licenses
					: [values.licenses],
			};

			await dispatch(addProduct(updatedValues));
			resetForm({
				values: {
					...initialValues,
					categories: [],
					platforms: [],
					licenses: [],
				},
			});
			//console.log(updatedValues);
			Swal.fire({
				text: 'Se ha agregado el producto',
				icon: 'success',
				timer: 1100,
			});
		} catch (error) {
			console.error('Error al agregar el producto:', error);
			Swal.fire({
				text: 'No Se ha agregado el producto',
				icon: 'error',
				title: 'Oops...',
			});
		}
	};

	useEffect(() => {
		dispatch(setCategories());
	}, [dispatch]);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={FormValidationsShema}>
			{({ values, setFieldValue, isValid }) => (
				<Form className='max-w-md mx-auto mt-10 mb-10'>
					<div className='mb-4'>
						<label htmlFor='name' className='block mb-2 font-sans'>
							Titulo
						</label>
						<Field
							type='text'
							id='name'
							name='name'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='name'
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
						<label htmlFor='quantity' className='block mb-2'>
							Quantity
						</label>
						<Field
							type='number'
							id='quantity'
							name='quantity'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='quantity'
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
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='price'
							component='div'
							className='text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='Categorias' className='block mb-2'>
							Categorias
						</label>
						{categories.length > 0 ? (
							<Field
								as='select'
								id='categories'
								name='categories'
								className='w-full p-2 border rounded drop-shadow-lg'>
								<option value='' disabled>
									Select a category
								</option>
								{categories.map((category) => (
									<option
										key={category.id}
										value={category.name}>
										{category.name}
									</option>
								))}
							</Field>
						) : (
							<div>Loading categories...</div>
						)}
						<ErrorMessage
							name='categories'
							component='div'
							className='text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='platforms' className='block mb-2'>
							Platforms
						</label>
						<Field
							type='text'
							id='platforms'
							name='platforms'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='platforms'
							component='div'
							className='text-red-500'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='licenses' className='block mb-2'>
							Licenses
						</label>
						<Field
							type='text'
							id='licenses'
							name='licenses'
							className='w-full p-2 border rounded drop-shadow-lg'
						/>
						<ErrorMessage
							name='licenses'
							component='div'
							className='text-red-500'
						/>
					</div>
					<button
						type='submit'
						className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'
						disabled={!isValid}>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
}
