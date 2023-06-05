import React, { useState } from "react";
import { loginUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import style from "../css/Login.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Google from "../img/Google.png";
import Apple from "../img/AppleLogin.png";
import Microsoft from "../img/Microsoft.png";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const iniciarSesion = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitUser = (e) => {
    iniciarSesion({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (event, state) => {
    event.preventDefault();

    loginUser(state);

    navigate("/Home");
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
        <h1>Acceder a tu cuenta</h1>

        <form action="/login" onSubmit={(event) => handleSubmit(event, state)}>
          <div>
            <label
              type={"text"}
              placeholder="Nombre de Usuario"
              htmlFor="email"
            >
              Email:{" "}
            </label>
            <input
              type="text"
              name="email"
              required
              onChange={iniciarSesion}
              value={state.email}
            />
          </div>
          <div>
            <label
              type={"password"}
              placeholder="Contraseña"
              htmlFor="password"
            >
              Contraseña:{" "}
            </label>
            <input
          type="password"
          name="password"
          required
          onChange={iniciarSesion}
          value={state.password}
        />
          </div>
          <div className={style.DivBotones}>
            <button
              onSubmit={SubmitUser}
              className={style.BotonIniciar}
              type="submit"
            >
              Ingresar
            </button>
			      <Link to='/register'>
              <button className={style.BotonIniciar}>Crear Cuenta</button>
			      </Link>
          </div>
        </form>
        <div className={style.DivCuentas}>
          <button>
            <img src={Google} className={style.Iconos} alt="Google" /> Continuar
            con Google
          </button>
          <button>
            <img src={Apple} className={style.Iconos} alt="Apple" /> Continuar
            con Apple
          </button>
          <button>
            <img src={Microsoft} className={style.Iconos} alt="Microsoft" />{" "}
            Continuar con Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (title) => dispatch(loginUser(title)),
  };
}

function mapStateToProps(state) {
  return {
    usuarioGuardado: state.usuarios,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
