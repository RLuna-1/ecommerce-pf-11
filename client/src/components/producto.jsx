import React from "react";
import styles from "../css/Producto.module.css";


const Producto = ({ id, name, image, price }) => {
  return (
    <div>
      <div className={styles.Producto} key={id}>
        <a href="/detail">
          <button>
            <img src={image} alt="Imagen del producto" />
          </button>
        </a>
        <h1>{name}</h1>
        <h2>$ {price}</h2>
        <button className={styles.BotonAgregar}>Agregar</button>
      </div>
    </div>
  );
};

export default Producto;
