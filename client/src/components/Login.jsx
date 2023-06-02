import React, { useState } from "react";
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
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showDivCuentas, setShowDivCuentas] = useState(true);
  const [createAccountValues, setCreateAccountValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("Ingrese su email")
      .matches(/@/, "Ingrese un email válido"),
    password: Yup.string()
      .required("Ingrese su contraseña")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "La contraseña debe contener al menos una letra y un número"),
  });

  const createAccountValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("Ingrese su email")
      .matches(/@/, "Ingrese un email válido"),
    password: Yup.string()
      .required("Ingrese su contraseña")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "La contraseña debe contener al menos una letra y un número"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirme su contraseña"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    if (values.email === "lucas@soyhenry.com" && values.password === "123abc") {
      navigate("/home");
    } else {
      setFieldError("password", "Inicio de sesión fallido");
    }
    setSubmitting(false);
  };

  const handleCreateAccountSubmit = (values) => {
    // Aquí puedes manejar el envío del formulario de creación de cuenta
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
        {showLoginForm && (
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
                  <button
                    className={style.BotonIniciar}
                    onClick={() => {
                      setShowCreateAccountForm(true);
                      setShowLoginForm(false);
                      setShowDivCuentas(false); // Ocultar el div DivCuentas
                    }}
                  >
                    Crear Cuenta
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {showCreateAccountForm && (
          <>
            <h2>Crear una cuenta</h2>
            <Formik
              initialValues={createAccountValues}
              validationSchema={createAccountValidationSchema}
              onSubmit={handleCreateAccountSubmit}
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
                  <div>
                    <label htmlFor="confirmPassword">Confirmar Contraseña: </label>
                    <Field type="password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
                  <div className={style.DivBotones}>
                    <button
                      className={style.BotonIniciar}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Crear cuenta
                    </button>
                    <button
                      className={style.BotonIniciar}
                      onClick={() => {
                        setShowCreateAccountForm(false);
                        setShowLoginForm(true);
                        setShowDivCuentas(true); // Ocultar el div DivCuentas
                      }}
                    >
                      Volver
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
        {showDivCuentas && (
          <div className={style.DivCuentas}>
            <button>
              <img src={Google} className={style.Iconos} /> Continuar con Google
            </button>
            <button>
              <img src={Apple} className={style.Iconos} /> Continuar con Apple
            </button>
            <button>
              <img src={Microsoft} className={style.Iconos} /> Continuar con Microsoft
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
