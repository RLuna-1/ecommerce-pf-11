import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Producto.module.css";

const Producto = ({ products,addToCart }) => {
 
  return (
    <div>
      <div className={styles.Producto} key={products.id}>
        <Link 
        
        to={`/detail/${products.id}`}>
          <button
          
          >
            <img src={products.image} alt="Imagen del producto" />
          </button>
        </Link>
        <h1>{products.name}</h1>
        <h2>$ {products.price}</h2>
        <button className={styles.BotonAgregar}
        onClick={()=>addToCart(products.id)}
        >Agregar</button>
      </div>
    </div>
  );
};

export default Producto;