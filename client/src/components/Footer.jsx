import React from "react";
import styles from "../css/Footer.module.css"
//import LogoClaro from "../img/LogoClaro.png"
import LogoOscuro from "../img/LogoOscuro.png"

const Footer = () => {
    return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.DivLogo}>
					<a href='/'>
						<img className={styles.Logo} src={LogoOscuro} alt="Logo"/>
					</a>
				</div>
			</div>
			<div className={styles.Contactos}>
				<h2>Contactanos</h2>
				<p>Codexpress@ejemplo.com</p>
				<p>Tel: 123456789</p>
			</div>
			<div className={styles.Compañia}>
				<h2>Equipo</h2>
				<p>Lucas Rojo - Ivan Valero</p>
				<p>Juan Carlos - Jose Valerio</p>
				<p>Lucas Risso - Iñaki Galindez</p>
			</div>
			<div className={styles.derechosReservados}>
				<small>
					&copy;{new Date().getFullYear()} CodExpress | Todos los
					derechos reservados.
				</small>
			</div>
		</footer>
	);
}
export default Footer