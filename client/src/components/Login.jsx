import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Ingrese un email válido").required("Ingrese su email"),
    password: Yup.string().required("Ingrese su contraseña")
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes realizar la lógica de inicio de sesión, como enviar una solicitud al servidor, validar las credenciales, etc.
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Acceder a tu cuenta</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
