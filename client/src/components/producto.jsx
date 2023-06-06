import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Producto.module.css";

const Producto = ({ id, name, image, price }) => {
  return (
    <div>
      <div className={styles.Producto} key={id}>
        <Link to={`/detail/${id}`}>
          <button>
            <img src={image} alt="Imagen del producto" />
          </button>
        </Link>
        <h1>{name}</h1>
        <h2>$ {price}</h2>
        <button className={styles.BotonAgregar}>Agregar</button>
      </div>
    </div>
  );
};

export default Producto;
