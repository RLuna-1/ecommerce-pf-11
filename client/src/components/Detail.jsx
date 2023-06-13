import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Detail.css";
import * as actions from "../redux/actions/actions";

export default function Detail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    dispatch(actions.setCart(productId));
  };
  

  return (
    <main className={styles.General}>
      <div className={styles.DivImg}>
        <img src={product?.image} alt="Imagen del producto" />
      </div>
      <div className={styles.DivInfo}>
        {product ? (
          <article>
            <header>
              <h1>{product.name}</h1>
            </header>
            <section>
              <h2>Precio</h2>
              <p>${product.price}</p>
            </section>
            <section>
              <h2>Descripción</h2>
              <p>{product.description}</p>
            </section>
            <section>
              <h2>Categoría</h2>
              <p>{product.categoria}</p>
            </section>
            <div className={styles.Botones}>
              <Link to={"/home"}>
                <button className={styles.Boton}>Regresar a inicio</button>
              </Link>
              <button
                className={styles.Boton}
                onClick={() => addToCart(product.id)}
              >
                Agregar al Carrito
              </button>
            </div>
          </article>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

