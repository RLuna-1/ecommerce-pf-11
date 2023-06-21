
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
import { Producto } from "../components/index";
import styles from "../css/Productos.module.css";
import { fetchProducts } from "../redux/actions/actions";

function Productos() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const addToCart = (id) => {
    dispatch(actions.setCart(id));
  };

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    const getLC = () => {
      const carLC = JSON.parse(localStorage.getItem('cart')) ?? []
      console.log(carLC);
      dispatch(actions.setCart(carLC))
    }
    getLC()
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  let renderProducts = null;

  if (Array.isArray(products)) {
    renderProducts = products.map((card) => (
      <div className={styles.Producto} key={card.id}>
        <Producto
          id={card.id}
          name={card.name}
          image={card.image}
          platforms={card.platforms}
          licenses={card.licenses}
          categories={card.categories}
          price={card.price}
          addToCart={addToCart}
        />
      </div>
    ));
  }

  return (
    <div className={styles.Productos}>
      {products && products.length > 0 ? (
        renderProducts
      ) : (
        <p>Sin productos disponibles</p>
      )}
    </div>
  );
}


export default Productos;
