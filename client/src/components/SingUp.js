import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../redux/actions/actions";
import style from "../css/SingUp.module.css";
import { Link } from "react-router-dom";
import LogoClaro from "../img/LogoClaro.png";

export function Register(props) {
  //Crear state de Producto

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //Funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarEstado = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value, //modifica el valor del input y lo guarda en actualizarState
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };
  console.log(state);
  const submitUser = (e) => {
    console.log(submitUser);
    actualizarEstado({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobilephone: "",
    });
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
        <Link to="/">
          <button>Regresar</button>
        </Link>
      </div>
      <div className={style.Login}>
        <h2>Create tu cuenta</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.addUser(state);
          }}
        >
          <div className="Name" className={`${errors.name && "danger"}`}>
            <span className="material-icons"> Nombre </span>
            <input
              type="text"
              name="name"
              //className="inputs"
              placeholder="Ingrese su nombre"
              onChange={actualizarEstado}
              value={state.name}
              required
            />
            {errors.name && (
              <p id="error" className="danger">
                {errors.name}
              </p>
            )}
          </div>
          <br />
          <br />

          <div
            className="Lastname"
            className={`${errors.lastName && "danger"}`}
          >
            <span className="material-icons"> </span>
            <input
              type="text"
              name="lastName"
              //className="inputs"
              placeholder="Ingrese su apellido"
              onChange={actualizarEstado}
              value={state.lastName}
              required
            />
            {errors.lastName && (
              <p id="error" className="danger">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <span class="material-icons">email</span>
            <input
              className={`${errors.email && "danger"}`}
              type="text"
              name="email"
              // className="inputs"
              placeholder="Ingrese su email"
              onChange={actualizarEstado}
              value={state.email}
              required
            />
            {errors.email && (
              <p id="error" className="danger">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <span class="material-icons">Password</span>
            <input
              className={`${errors.password && "danger"}`}
              type="password"
              name="password"
              //className="inputs"
              placeholder="Ingrese su contraseña"
              onChange={actualizarEstado}
              value={state.password}
              required
            />
            {errors.password && (
              <p id="error" className="danger">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              //className="inputs"
              placeholder="Introduzca su contraseña nuevamente"
              onChange={actualizarEstado}
              value={state.confirmPassword}
              required
            />
          </div>

          <div>
            <span class="material-icons">Contact Phone</span>
            <input
              className={`${errors.mobilephone && "danger"}`}
              type="tel"
              name="mobilephone"
              //className="inputs"
              placeholder="Ingrese su numero de Telefono, Ej.:(011)18234460"
              onChange={actualizarEstado}
              value={state.mobilephone}
              maxlength="16"
              minlength="11"
              required
            />
            {errors.mobilephone && (
              <p id="error" className="danger">
                {errors.mobilephone}
              </p>
            )}
          </div>
          <div className={style.DivBotones}>
            <Link to="/login"><button>Iniciar Sesion</button></Link> 
            <button
              onSubmit={submitUser}
              type="submit"
              class="btn btn-primary"
            >
              {" "}
              Registrarse{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    usuarioGuardado: state.usuarios,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addUser: (title) => dispatch(addUser(title)),
  };
}

export function validate(state) {
  let errors = {};
  if (!state.name) {
    errors.name = "Name is required";
  }
  if (!state.lastName) {
    errors.lastName = "Lastname is required";
  }
  if (!state.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.email = "Email is invalid";
  }
  if (!state.password) {
    errors.password = "Password is required";
  } else if (!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(state.password)) {
    errors.password =
      "password must have at least one upper case and two numbers";
  } else if (state.password !== state.confirmPassword) {
    errors.password = "Passwords don't match";
  }
  if (!/^\d{11}$/.test(state.mobilephone)) {
    errors.mobilephone = "A valid telephone number should consist of 8 digits";
  }
  
  return errors;
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
