import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";

import Producto from "../components/producto";
import styles from "../css/Productos.module.css";
import { fetchProducts } from "../redux/actions/actions";

function Productos() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state => state.categories))

  const addToCart = (id) => {
    dispatch(actions.addToCarta(id));
    // alert("Se Ha Agregado el Producto");

  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const renderProducts =
    products &&
    products.map((card, index) => (
      
      <Producto
        key={index}
        id={card.id}
        name={card.name}
        image={card.image}
        platforms={card.platforms}
        licenses={card.licenses}
        categories={card.categories}
        price={card.price}
        addToCart={addToCart}
        
      />
    ));

    console.log(categories)

  return (
    <div>
      <div>{products ? renderProducts : <p>There's no products with the given data</p>}</div>
    </div>
  );
}

export default Productos;