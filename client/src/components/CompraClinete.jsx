import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/CompraCliente.module.css";
import * as actions from "../redux/actions/actions";

const CompraCliente = () => {
  // Esto es para agregar lo del carrito
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(actions.setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // Hasta aca

  return (
    <div>
      <div className={styles.Compras}>
        <div className={styles.Elementos}>
          <h1>Mis Compras</h1> {/* Agrega todo lo que se carga en el carrito */}
          <div>
            {cart.map((producto, i) => (
              <div key={i} className={styles.Carta}>
                <img
                  src={producto.image}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {producto.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      $ {producto.price} Cantidad: {producto.quantity}
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      Subtotal: {producto.price * producto.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
          {/* Hasta aca */}
        </div>
      </div>
    </div>
  );
};
export default CompraCliente;
