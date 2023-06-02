import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "../css/Login.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Google from "../img/Google.png";
import Apple from "../img/AppleLogin.png";
import Microsoft from "../img/Microsoft.png";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("Ingrese su email"),
    password: Yup.string().required("Ingrese su contraseña"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes realizar la lógica de inicio de sesión, como enviar una solicitud al servidor, validar las credenciales, etc.
    // Verificamos si el usuario y la contraseña coinciden
    if (values.email === "lucas@soyhenry.com" && values.password === "123abc") {
      // Inicio de sesión exitoso, redireccionar a la ruta "home"
      navigate("/home");
    } else {
      // Inicio de sesión fallido, puedes mostrar un mensaje de error o realizar alguna otra acción
      console.log("Inicio de sesión fallido");
    }
    setSubmitting(false);
  };

  return (
    <div className={style.General}>
      <div className={style.DivBienvenido}>
        <h1>Bienvenidos a CodeXpress</h1>
        <p>
          Nuestra plataforma de venta de software! Descubre soluciones de
          vanguardia para potenciar tu productividad, seguridad y creatividad.
          Regístrate y lleva tus proyectos al siguiente nivel
        </p>
        <div className={style.DivImg}>
          <img src={LogoClaro} alt="Logo" />
        </div>
        <Link to="/"><button>Regresar</button></Link>
      </div>
      <div className={style.Login}>
        <h1>Acceder a tu cuenta</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="email">Email: </label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Contraseña: </label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className={style.DivBotones}>
                <button
                  className={style.BotonIniciar}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Ingresar
                </button>
                <button className={style.BotonIniciar}>Crear Cuenta</button>
              </div>
              <div className={style.DivCuentas}>
                <button><img src={Google} className={style.Iconos}/> Continuar con Google</button>
                <button><img src={Apple} className={style.Iconos}/> Continuar con Apple</button>
                <button><img src={Microsoft} className={style.Iconos}/> Continuar con Microsoft</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
