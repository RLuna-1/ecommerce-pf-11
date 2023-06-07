import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Ingrese un email válido')
		.required('Ingrese su email')
		.matches(/@/, 'Ingrese un email válido'),
	password: Yup.string()
		.required('Ingrese su contraseña')
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d).*$/,
			'La contraseña debe contener al menos una letra y un número',
		),
});

  const createAccountValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Ingrese un email válido')
			.required('Ingrese su email')
			.matches(/@/, 'Ingrese un email válido'),
		password: Yup.string()
			.required('Ingrese su contraseña')
			.matches(
				/^(?=.*[a-zA-Z])(?=.*\d).*$/,
				'La contraseña debe contener al menos una letra y un número',
			),
		confirmPassword: Yup.string()
			.oneOf(
				[Yup.ref('password'), null],
				'Las contraseñas deben coincidir',
			)
			.required('Confirme su contraseña'),
  });

export { validationSchema, createAccountValidationSchema };