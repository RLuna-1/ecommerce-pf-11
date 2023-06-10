import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
import { Producto } from "../components/index";
import styles from "../css/Productos.module.css";

function Productos() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.allProducts);
  const cart = useSelector((state) => state.cart);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(actions.addToCarta(id));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(actions.getAllProducts(currentPage));
  }, [dispatch, currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className={styles.Productos}>
        {filteredProducts.length > 0
          ? filteredProducts.map((p) => (
              <Producto key={p.id} product={p} addToCart={addToCart} />
            ))
          : products.map((p) => (
              <Producto key={p.id} product={p} addToCart={addToCart} />
            ))}
      </div>
      <div>
        {currentPage > 1 && (
          <button className={styles.BotonNavegacion} onClick={goToPreviousPage}>
            Atrás
          </button>
        )}
        <button className={styles.BotonNavegacion} onClick={goToNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Productos;
