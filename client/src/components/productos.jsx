import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
import { Producto } from "../components/index";
import styles from "../css/Productos.module.css";

function Productos() {
  const products = useSelector((state) => state.allProducts);
  const cart = useSelector((state) => state.cart);
  const currentPage = useSelector((state) => state.currentPage);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(actions.addToCarta(id));
    alert("Se Ha Agregado el Producto");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(actions.getAllProducts(currentPage));
  }, [dispatch, currentPage]);

  const goToNextPage = () => {
    console.log("Se presiono")
    dispatch(actions.setCurrentPage(currentPage + 1));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(actions.setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className={styles.Productos}>
      {filteredProducts.length > 0
        ? filteredProducts.map((p) => (
            <Producto key={p.id} products={p} addToCart={addToCart} />
          ))
        : products.map((p) => (
            <Producto key={p.id} products={p} addToCart={addToCart} />
          ))}
      {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Atrás</button>
        )}
      <button onClick={goToNextPage}>Siguiente</button>
    </div>
  );
}

export default Productos;