// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../redux/actions/actions";
// import { Producto } from "../components/index";
// import styles from "../css/Productos.module.css";
// import { fetchProducts } from "../redux/actions/actions";

// function Productos() {
//   // const [currentPage, setCurrentPage] = useState(1);
//   const products = useSelector((state) => state.products);
//   const cart = useSelector((state) => state.cart);
//   const filteredProducts = useSelector((state) => state.filteredProducts);
//   const dispatch = useDispatch();
//   const filters = useSelector((state) => state.filters);

//   const addToCart = (id) => {
//     dispatch(actions.setCart(id));
//   };

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);


//   useEffect(() => {
//     dispatch(fetchProducts(filters));
//   }, [dispatch, filters]);

//   const renderProducts =
//   products &&
//   products.map((card, index) => (
//     <div class={styles.Producto}>
//     <Producto
//       key={index}
//       id={card.id}
//       name={card.name}
//       image={card.image}
//       platforms={card.platforms}
//       licenses={card.licenses}
//       categories={card.categories}
//       price={card.price}
//       addToCart={addToCart}
      
//     />
//     </div>
//   ));


//   return (
//     <div class={styles.Productos}>
//     <div>{products ? renderProducts : <p>There's no products with the given data</p>}</div>
//   </div>
//   );
// }
// export default Productos;

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
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const renderProducts = products.map((card) => (
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

  return (
    <div className={styles.Productos}>
      {products.length > 0 ? (
        renderProducts
      ) : (
        <p>There are no products with the given data</p>
      )}
    </div>
  );
}

export default Productos;
