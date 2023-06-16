import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../css/Nav.module.css";
import LogoClaro from "../img/LogoClaro.png";
import Carrito from "../img/Carrito.png";
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
  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    if (storedLoggedInStatus) {
      setIsLoggedIn(JSON.parse(storedLoggedInStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleOrdenarChange = (opcion) => {
    // Aquí puedes realizar acciones según la opción seleccionada en el componente Ordenar
    console.log("Opción de ordenamiento seleccionada:", opcion);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(searchByName(searchTerm));
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
          <Link to="/FQA">
            <button className={styles.ButtonNav}>Preguntas Frecuentes</button>
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
            {isLoggedIn ? (
              <>
                <Link to="/infocliente">
                  <button className={styles.ButtonNav}>Mi Perfil</button>
                </Link>
                <Link to="/compracliente">
                  <button className={styles.ButtonNav}>Mis Compras</button>
                </Link>
                <Link to="/">
                  <button onClick={handleLogout} className={styles.ButtonNav}>
                    Cerrar Sesión
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button className={styles.ButtonNav}>Iniciar Sesión</button>
              </Link>
            )}
			 {isLoggedIn ? (
              <Link to="/dashboard">
                <button className={styles.ButtonNav}>Administrador</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
