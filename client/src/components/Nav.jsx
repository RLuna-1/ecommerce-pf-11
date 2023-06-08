import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../css/Nav.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Carrito from "../img/Carrito.png";
import FilterComponent from './FilterByCategorie';
import Ordenar from './Ordenar';

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Aquí puedes realizar la lógica de cierre de sesión, como limpiar las variables de sesión, etc.
    setIsLoggedIn(true);
    navigate("/login"); // Redireccionar al usuario a la página de inicio de sesión
  };

  const handleOrdenarChange = (opcion) => {
    // Aquí puedes realizar acciones según la opción seleccionada en el componente Ordenar
    console.log("Opción de ordenamiento seleccionada:", opcion);
  };

  const handleRefrescar = () => {
    pathname === "/home" && window.location.reload();
  };

  return (
    <div className={styles.Nav}>
      <div className={styles.DivLogo}>
        <a href="/">
          <img className={styles.Logo} src={LogoClaro} alt="Logo" />
        </a>
      </div>
      {pathname !== "/" && (
        <div className={styles.DivCentral}>
          <Link to="/home">
            <button onClick={handleRefrescar} className={styles.ButtonNav}>Productos</button>
          </Link>
          <Link to="/vender">
            <button className={styles.ButtonNav}>Vender</button>
          </Link>
          {pathname !== "/vender" && pathname !== "/carrito" && (
          <div>
            <div className={styles.FiltroDropdown}>
              <button className={styles.ButtonNav}>Filtrar</button>
              <div className={styles.FiltroContent}>
                <FilterComponent />
              </div>
            </div>
            <div className={styles.FiltroDropdown}>
              <button className={styles.ButtonNav}>Ordenar</button>
              <div className={styles.FiltroContent}>
                <Ordenar onOrdenarChange={handleOrdenarChange} />
              </div>
            </div>
            <input className={styles.SearchBar} placeholder="Buscar Software" type="text" />
          </div> )}
        </div>
      )}

      <div className={styles.DivLogin}>
        {pathname === "/" && (
          <Link to="/home">
            <button className={styles.ButtonNav}>Ingresar</button>
          </Link>
        )}
        {pathname !== "/" && pathname !== "/carrito" && (
          <Link to="/carrito">
            <button className={styles.Carrito}>
              <img src={Carrito} alt="Carrito" />
            </button>
          </Link>
        )}
        {isLoggedIn ? (
          <Link to="/login">
            <button className={styles.Iniciar}>Iniciar Sesión</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={handleLogout} className={styles.Cerrar}>
              Cerrar Sesión
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
