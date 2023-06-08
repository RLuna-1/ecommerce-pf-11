import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../redux/actions/actions";

export default function Detail() {
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
  const addToCart = () => {
    console.log(product.id);
    dispatch(actions.addToCarta(id));
  };

  return (

    <main>
      <div style={{ display: "flex" }}>
        <div
          style={{ Width: "100%", border: "1px solid #000", padding: "10px" }}
        >
          <div>
            <div>
              <img
                src={product?.image}
                alt="Imagen del producto"
                style={{ maxWidth: "50%", maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>

        <div style={{ flex: "60%" }}>

          {product ? (
            <article>
              <header>
                <h1 className='text-2xl font-bold mb-4'>Detalles</h1>
              </header>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Precio</h2>
                <p>${product.price}</p>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Descripción</h2>
                <p className='mb-4'>{product.description}</p>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Categoría</h2>
                <p>{product.categoria}</p>
              </section>
              <section>

                <Link to={"/home"}>
                  <button>

                    <span>Regresar a inicio</span>
                  </button>
                </Link>
              </section>

              <Link to={"/carrito"}>
                <button onClick={addToCart}>

                  <span>Agregar al Carrito</span>
                </button>
              </Link>
            </article>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );

}