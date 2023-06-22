import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/CompraCliente.module.css";
import * as actions from "../redux/actions/actions";
import Cookies from "js-cookie";

const CompraCliente = () => {
  const [review, setReview] = useState({});
  const [showForm, setShowForm] = useState({});
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

  const userIdFromLocalStorage = localStorage.getItem("userId");
  const userIdFromCookie = Cookies.get("userId");
  const userId =
    userIdFromLocalStorage ||
    userIdFromCookie ||
    "68cf176c-28fe-4303-81b9-ee4e21520d0c";

  const handleCreateReview = (producto) => {
    setReview({
      ...review,
      [producto.id]: { description: "", rating: 0 },
    });
    setShowForm({
      ...showForm,
      [producto.id]: true,
    });
  };

  const handleFormSubmit = (e, producto) => {
    e.preventDefault();
    const reviewData = {
      rating: review[producto.id].rating,
      description: review[producto.id].description,
      userId: userId,
      productId: producto.id,
    };
    dispatch(actions.addReview(reviewData));
    setShowForm({
      ...showForm,
      [producto.id]: false,
    });
  };

  const handleReviewChange = (e, producto) => {
    let newRating = parseInt(e.target.value);
    if (newRating < 0) newRating = 0;
    if (newRating > 5) newRating = 5;
    setReview({
      ...review,
      [producto.id]: {
        ...review[producto.id],
        rating: newRating,
      },
    });
  };

  const handleDescriptionChange = (e, producto) => {
    const newDescription = e.target.value;
    setReview({
      ...review,
      [producto.id]: {
        ...review[producto.id],
        description: newDescription,
      },
    });
  };

  return (
    <div>
      <div className={styles.Compras}>
        <div className={styles.Elementos}>
          <h1>Mis Compras</h1>
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
                {showForm[producto.id] ? (
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <form onSubmit={(e) => handleFormSubmit(e, producto)}>
                      <input
                        className="mt-1 text-xs text-gray-700 border border-black rounded px-2 py-1"
                        type="number"
                        name="rating"
                        value={review[producto.id].rating}
                        onChange={(e) => handleReviewChange(e, producto)}
                        min="0"
                        max="5"
                      />
                      <textarea
                        className="mt-1 text-xs text-gray-700 border border-black rounded px-2 py-1"
                        name="description"
                        value={review[producto.id].description}
                        onChange={(e) => handleDescriptionChange(e, producto)}
                      />
                      <button
                        type="submit"
                        className="border border-black rounded px-2 py-1 mt-1 text-xs text-gray-700"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                ) : (
                  <button
                    className="mt-1 text-xs text-gray-700 border border-red-500 rounded px-2 py-1"
                    onClick={() => handleCreateReview(producto)}
                  >
                    Crear Reseña
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraCliente;
