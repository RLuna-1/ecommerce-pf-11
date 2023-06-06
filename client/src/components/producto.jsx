import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
import styles from "../css/Producto.module.css"
import { Link } from 'react-router-dom';

const Producto = () => {
  const products = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllProducts());
  }, [dispatch]);
  return (
    <div>
      {console.log("esto es products", products)}
      <div>
        {products &&
          products.map((p) => {
            return (
              <div className={styles.General}>
				<div className={styles.Producto} key={p.id}>
					<Link to="/detail">
					<button>
						<img src={p.image} alt="Imagen del producto" />
					</button>
					</Link>
					<h1>{p.name}</h1>
					<h2>$ {p.price}</h2>

					<button className={styles.BotonAgregar}>Agregar</button>
				</div>
			  </div>
            );
          })}
      </div>
    </div>
  );
};

export default Producto;

/*

								<p>{p.id}</p>
								<p>{p.name}</p>
								<p>{p.description}</p>
								<p>{p.quantity}</p>
								<p>{p.price}</p>

<div className={styles.Producto} key={producto.id}>
            <Link to="/detail">
              <button>
                <img src={producto.image} alt="Imagen del producto"/>
              </button>
            </Link>
            <h1>{producto.title}</h1>
            <h2>{producto.price}</h2>
            <button className={styles.BotonAgregar}>Agregar</button>
          </div>

*/
