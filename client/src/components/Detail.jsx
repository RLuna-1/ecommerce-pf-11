import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Detail.css";
import * as actions from "../redux/actions/actions";
import Swal from "sweetalert2";

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

  const addToCart = (id) => {
    try{
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
            <div >
              <Link to={"/home"}>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Regresar a inicio</button>
              </Link>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

