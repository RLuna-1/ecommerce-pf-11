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
	categories: Yup.string().required('Este campo es obligatorio'),
	platforms: Yup.string().required('Este campo es obligatorio'),
	licenses: Yup.string().required('Este campo es obligatorio'),
	price: Yup.number()
		.required('Este campo es obligatorio')
		.positive('Ingrese un número positivo mayor a cero'),
	quantity: Yup.number()
		.required('Este campo es obligatorio')
		.positive('Ingrese un número positivo mayor a cero'),
});

export default validationSchemaForm;

