import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../css/Nav.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Carrito from "../img/Carrito.png";
import FilterComponent from "./FilterByCategorie";
import Ordenar from "./Ordenar";
import IconoUser from "../img/IconoUser.png";
import { AuthContext } from "./AuthContext";
import { searchByName } from "../redux/actions/actions";
import { useDispatch } from "react-redux";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Aquí puedes realizar la lógica de cierre de sesión, como limpiar las variables de sesión, etc.
    setIsLoggedIn(false);
    navigate("/login"); // Redireccionar al usuario a la página de inicio de sesión
    // logoutUser();
  };

  const handleRefrescar = () => {
    pathname === "/home" && window.location.reload();
  };

  return (
    <div className={styles.Nav}>
      <div className={styles.DivLogo}>
        <a href="/home">
          <img className={styles.Logo} src={LogoClaro} alt="Logo" />
        </a>
      </div>
      {pathname !== "/" && (
        <div className={styles.DivCentral}>
          <Link to="/home">
            <button onClick={handleRefrescar} className={styles.ButtonNav}>
              Productos
            </button>
          </Link>
          <Link to="/landing">
            <button className={styles.ButtonNav}>Nosotros</button>
          </Link>
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
        <div className={styles.PerfilDropdown}>
          <img src={IconoUser} alt="User" className={styles.Perfil} />
          <div className={styles.PerfilContent}>
            <Link to="/infocliente">
              <button className={styles.ButtonNav}>Mi Perfil</button>
            </Link>
            <Link to="/compracliente">
              <button className={styles.ButtonNav}>Mis Compras</button>
            </Link>
            {isLoggedIn ? (
              <Link to="/#">
                <button className={styles.ButtonNav}>Administrador</button>
              </Link>
            ) : null}
            {isLoggedIn ? (
              <Link to="/">
                <button onClick={handleLogout} className={styles.ButtonNav}>
                  Cerrar Sesión
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className={styles.ButtonNav}>Iniciar Sesión</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
