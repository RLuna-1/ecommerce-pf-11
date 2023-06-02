const validateForm = (values) => {
	const errors = {};

	if (!values.image.trim()) {
		errors.image = 'Este campo es obligatorio';
	} else if (
		!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(values.image.trim())
	) {
		errors.image =
			'La URL de la imagen debe comenzar con http:// o https://';
	}
	return errors;
};

export default validateForm;