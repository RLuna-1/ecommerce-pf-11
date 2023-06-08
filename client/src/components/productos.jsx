import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
import { Producto } from '../components/index';
import styles from '../css/Productos.module.css';

function Productos() {
  const products = useSelector((state) => state.allProducts);
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();

  const addToCart = (id)=>{
  dispatch(actions.addToCarta(id))
  }
  

  useEffect(() => {
    dispatch(actions.getAllProducts());
  }, [dispatch]);
  return (
    <div className={styles.Productos}>
      {products && products.map((p) => {
        return (
          <Producto 
          key={p.id}
            products={p}
            addToCart={addToCart}
          />
        )
      })}
    </div>
  );
}

export default Productos;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as actions from '../redux/actions/actions';
// import { Producto } from '../components/index';
// import styles from '../css/Productos.module.css';

// function Productos() {
// 	const products = useSelector((state) => state.allProducts);
// 	const filteredProducts = useSelector((state) => state.filteredProducts);

// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(actions.getAllProducts());
// 	}, [dispatch]);

// 	return (
// 		<div>
// 			<div className={styles.Productos}>
// 				{filteredProducts.length > 0 ? (
// 					<Producto products={filteredProducts} />
// 				) : (
// 					<Producto products={products} />
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default Productos;
