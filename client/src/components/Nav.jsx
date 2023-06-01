import React from "react";
import {Link, useLocation} from "react-router-dom"
import styles from "../css/Nav.module.css"
import LogoClaro from "../img/LogoClaro.png"
//import LogoOscuro from "../img/LogoOscuro.png"

const Nav = () => {
    const {pathname} = useLocation();
    return (
        <div className={styles.Nav}> 
            <div className={styles.DivLogo}>
                <a href="/"><img className={styles.Logo} src={LogoClaro}/></a>
                {/*<a href="/"><img src={LogoClaro}/></a>*/}
            </div>
            {pathname !== "/" && <div className={styles.DivCentral}>
                <Link to="/productos"> <button className={styles.ButtonNav}>Productos</button> </Link>
                <Link to="/productos"> <button className={styles.ButtonNav}>Vender</button> </Link>
                <Link to="/filtrar"> <button className={styles.ButtonNav}>Filtrar</button> </Link> {/*luego lo tranformo en desplegable*/}
                <input className={styles.SearchBar} placeholder="Buscar Software" type="text"/>
                {/*luego agrego el seacrh*/}
            </div>}
            
            <div className={styles.DivLogin}>
                {pathname !== "/home" && <Link to="/home"><button className={styles.ButtonNav}>Ingresar</button> </Link>}
                {(pathname !== "/" && pathname !== "/carrito") && <Link to="/Carrito"> <button className={styles.ButtonNav}>Carrito</button> </Link>}
                <Link to="/login"> <button className={styles.Iniciar}>Iniciar Sesion</button> </Link>
                {/*<Link to="/"> <button className={styles.Cerrar}>Cerrar Sesion</button> </Link>*/}
            </div>
            
        </div>
    )
}
export default Nav