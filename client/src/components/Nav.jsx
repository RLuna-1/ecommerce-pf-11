import React, { useState } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom"
import styles from "../css/Nav.module.css"
import LogoClaro from "../img/LogoClaro.png"
import Carrito from "../img/Carrito.png"
//import LogoOscuro from "../img/LogoOscuro.png"

const Nav = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLogout = () => {
      // Aquí puedes realizar la lógica de cierre de sesión, como limpiar las variables de sesión, etc.
      setIsLoggedIn(true);
      navigate("/login"); // Redireccionar al usuario a la página de inicio de sesión
    };
    return (
        <div className={styles.Nav}> 
            <div className={styles.DivLogo}>
                <a href="/"><img className={styles.Logo} src={LogoClaro}/></a>
                {/*<a href="/"><img src={LogoClaro}/></a>*/}
            </div>
            {pathname !== "/" && <div className={styles.DivCentral}>
                <Link to="/home"> <button className={styles.ButtonNav}>Productos</button> </Link>
                <Link to="/vender"> <button className={styles.ButtonNav}>Vender</button> </Link>
                <button className={styles.ButtonNav}>Filtrar</button> {/*luego lo tranformo en desplegable*/}
                <input className={styles.SearchBar} placeholder="Buscar Software" type="text"/>
                {/*luego agrego el seacrh*/}
            </div>}
            
            <div className={styles.DivLogin}>
                {pathname === "/" && <Link to="/home"><button className={styles.ButtonNav}>Ingresar</button> </Link>}
                {(pathname !== "/" && pathname !== "/carrito") && <Link to="/carrito"> <button className={styles.Carrito}><img src={Carrito} alt="Carrito"/></button> </Link>}
                {isLoggedIn ? (
                <Link to="/login"> <button className={styles.Iniciar}>Iniciar Sesion</button> </Link>
                ) : (
                <Link to="/"> <button onClick={handleLogout} className={styles.Cerrar}>Cerrar Sesion</button> </Link>
                )}
            </div>
            
        </div>
    )
}
export default Nav