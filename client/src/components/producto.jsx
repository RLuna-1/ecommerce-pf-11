import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; 
import * as actions from "../redux/actions/actions";
import styles from "../css/Producto.module.css";

function Producto({ product }) {
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(actions.addToCarta(id));
  };

  const addToWishlist = (id) => {
    dispatch(actions.addToWishlist(id));
  };

  return (
    <div className={styles.Producto}>
      <div key={product.id}>
        <Link to={`/detail/${product.id}`}>
          <button>
            <img src={product.image} alt='Imagen del producto' />
          </button>
        </Link>
        <h1>{product.name}</h1>
        <h2>$ {product.price}</h2>
        <p>categotia: {product.categories[0].name}</p>
        <p>plataforma: {product.platforms[0].name}</p>
        <p>{product.description}</p>
      </div>
      <button className={styles.BotonAgregar} onClick={() => addToCart(product.id)}>Agregar al carrito</button>
      <button className={styles.BotonAgregar} onClick={() => addToWishlist(product.id)}>Agregar a la lista de deseos</button>
    </div>
  );
}

export default Producto;


