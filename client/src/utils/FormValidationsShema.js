import * as Yup from 'yup';

 const validationSchemaForm = Yup.object().shape({
		name: Yup.string()
			.trim()
			.required('Este campo es obligatorio')
			.matches(
				/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
				'El título solo puede contener letras y espacios',
			),
		description: Yup.string().required('Este campo es obligatorio'),
		image: Yup.string()
			.trim()
			.required('Este campo es obligatorio')
			.matches(
				/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
				'La URL de la imagen debe comenzar con http:// o https://',
			),
		quantity: Yup.string().required('Este campo es obligatorio'),
		category: Yup.string().required('Este campo es obligatorio'),
		price: Yup.number()
			.required('Este campo es obligatorio')
			.positive('Ingrese un número positivo mayor a cero'),
		platforms: Yup.string().required('Este campo es obligatorio'),
		licenses: Yup.string().required('Este campo es obligatorio'),
 });

export default validationSchemaForm;

