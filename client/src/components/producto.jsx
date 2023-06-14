import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";
import styles from "../css/Producto.module.css";
import Swal from "sweetalert2";

function Producto({ id, name, image, price, licenses, platforms, categories }) {
  const dispatch = useDispatch();

  const addToCart = (id) => {
    try {
      dispatch(actions.setCart(id));
      Swal.fire({
        text: "Se ha agregado el producto",
        icon: "success",
        timer: 1100,
      });
    } catch (error) {
      Swal.fire({
        text: "Error al agregar el producto",
        icon: "warning",
        timer: 2000,
      });
      throw error;
    }
  };

  const agregarAlWishlist = (id) => {
    dispatch(actions.addToWishlist(id));
  };

  return (
    <div className="w-full max-w-sm bg-#1F2937 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1 p-2">
      <Link to={`/detail/${id}`}>
        <img className={styles.productoImage} src={image} alt="product image" />
      </Link>
      <div className="px-5 pb-5 flex flex-col items-end justify-center">
        <Link to={`/detail/${id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Categoria: {categories[0].name}
          </h5>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $ {price}
          </span>

          <a className={styles.ButtonAgregar} onClick={() => addToCart(id)}>
            Agregar al Carrito
          </a>
        </div>
      </div>
    </div>
  );
}
export default Producto;
