import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormULRValidate from '../utils/FormULRValidate';
import FormValidationsShema from '../utils/FormValidationsShema';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCategoryRoute } from '../redux/actions/actions';
import Swal from 'sweetalert2';
import '../css/index.css';

//copiar y pegar todo el codigo en el componente FormNewProduct y eliminar el componente NewForm.jsx y elimiar de app.js la importacion de componente.
export default function FormNewProduc() {
	const dispatch = useDispatch();
	const categoryRoute = useSelector((state) => state.categoryRoute);
	console.log(categoryRoute);
	const initialValues = {
		name: '',
		description: '',
		image: '',
		quantity: '',
		price: '',
		category: '',
		platforms: '',
		licenses:'',
	};

	const onSubmit = async (values, { resetForm }) => {
		try {
			await dispatch(addProduct(values));
			resetForm({
				values: { ...initialValues, category:'' },
			});
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
		dispatch(getCategoryRoute());
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
							Cantidad
						</label>
						<Field
							type='number'
							id='quantity'
							name='quantity'
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
							as='select'
							id='category'
							name='category'
							className='w-full p-2 border rounded drop-shadow-lg'>
							<option value=''>Seleccione una categoría</option>
							{categoryRoute.map((category) => (
								<option key={category}>{category}</option>
							))}
						</Field>
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
					<div className='mb-4'>
						<label htmlFor='platforms' className='block mb-2'>
							Plataformas
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
							Licencias
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