import React from "react";
import styles from "../css/InfoCliente.module.css"
import FotoPerfil from "../img/PerfilUser.png"


const InfoCliente = () => {
    return (
		<div>
            <div className={styles.Info}>
                <div className={styles.Perfil}>
                    <img src={FotoPerfil} alt="Usuario" />
                    <h1>Lucas El Rojo</h1> {/* Aca va Nombre + Apellido */}
                </div>
                <div className={styles.Datos}>
                    <h1>Nombre: Lucas {/* Aca va Nombre */}</h1>
                    <h1>Apellido: El Rojo</h1> {/* Aca va Apellido */}
                    <h1>Telefono: 123456789123</h1>{/* Aca va Numero */}
                    <h1>Correo: tu_gatito_salvaje_69@gmail.com</h1>{/* Aca va Correo */}
                    <div className={styles.Botones}>
                        <button>Mis Compras</button>
                        <button>Cerrar Sesion</button>
                    </div>
                </div>
            </div>
        </div>
	);
}
export default InfoCliente