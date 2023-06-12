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

  const agregarAlWishlist = (id) => {
    dispatch(actions.addToWishlist(id));
  };

  return (
    <div className="w-full max-w-sm bg-#1F2937 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1 p-2">
      <Link to={`/detail/${product.id}`}>
        <img
          className={styles.productos}
          src={product.image}
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5 flex flex-col items-end justify-center">
        <Link to={`/detail/${product.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Categoria: {product.categories[0].name}
          </h5>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $ {product.price}
          </span>
          <a
            onClick={() => addToCart(product.id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}


export default Producto;
    // <div className={styles.Producto}>
    //   <div key={product.id}>
    //     <Link to={`/detail/${product.id}`}>
    //       <button>
    //         <img src={product.image} alt='Imagen del producto' />
    //       </button>
    //     </Link>
    //     <h1>{product.name}</h1>
    //     <h2>$ {product.price}</h2>
    //     <p>categotia: {product.categories[0].name}</p>
    //     <p>plataforma: {product.platforms[0].name}</p>
    //     <p>{product.description}</p>
    //   </div>
    //   <button className={styles.BotonAgregar} onClick={() => addToCart(product.id)}>Agregar al carrito</button>
    //   <button className={styles.BotonAgregar} onClick={() => agregarAlWishlist(product.id)}>Agregar a la lista de deseos</button>
    // </div>