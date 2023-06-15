import React, { useEffect, useState } from "react";
import styles from "../css/Carrito.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  remove1FromCart,
  removeFromCart,
  sume1FromCart,
} from "../redux/actions/actions";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";
// import eliminarIcono from '../img/cesto_basura.png';

const Carrito = () => {
  const cart = useSelector((state) => state.cart);

  const price = cart
    .map((ele) => ele.price * ele.quantity)
    .reduce(function (acumulador, elemento) {
      return acumulador + elemento;
    }, 0);
    
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(actions.setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [mostrarBotonComprar, setMostrarBotonComprar] = useState(true);

  const eliminarProducto1 = (id) => {
    dispatch(remove1FromCart(id));
  };
  const sumarProducto1 = (id) => {
    dispatch(sume1FromCart(id));
  };
  const eliminarProducto = (id) => {
    dispatch(removeFromCart(id));
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const mostrarFormularioEmergente = () => {
    setMostrarFormulario(true);
    setMostrarBotonComprar(false); // Oculta el primer botón "Comprar"
  };

  const ocultarFormularioEmergente = () => {
    setMostrarFormulario(false);
    setMostrarBotonComprar(true); // Muestra el primer botón "Comprar" nuevamente
  };

  const realizarCompra = () => {
    if (
      nombre !== "" &&
      dni !== "" &&
      telefono !== "" &&
      direccion !== "" &&
      codigoPostal !== ""
    ) {
      setMensajeCompra("¡La compra se ha realizado exitosamente!");
    } else {
      setMensajeCompra("Por favor, completa todos los campos del formulario.");
    }
  };

  return (
    <div className={styles.General}>
      {cart.map((producto, i) => (
        <div key={i} className={styles.Elemento}>
          <img src={producto.image} alt="Imagen del producto" />
          <h1>{producto.name}</h1>
          <h1>
            $ {producto.price}.00 Cantidad: {producto.quantity}{" "}
          </h1>
          <h4>Subtotal: ${producto.price * producto.quantity}</h4>
          <div >
            <button
              className={styles.BotonEliminar}
              onClick={() => eliminarProducto1(producto.id)}
            >-</button> 
             <button
              className={styles.BotonEliminar}
              onClick={() => sumarProducto1(producto.id)}
            >+</button> 
             <button
              className={styles.BotonEliminar}
              onClick={() => eliminarProducto(producto.id)}
            >Eliminar Productos</button>
          </div>
        </div>
      ))}

      {cart.length && (
        <h2>
          Total ({cart.length} Articulos): ${price}
        </h2>
      )}

      {mostrarBotonComprar && (
        <button className={styles.Comprar} onClick={mostrarFormularioEmergente}>
          Comprar
        </button>
      )}
      <Link></Link>
      <button className={styles.Comprar}>
        <Link to={`/home`}>
          Mas Productos
          </Link>
      </button>

      {mostrarFormulario && (
  <div className={styles.ElementoCompra}>
    <h2>Formulario de Compra</h2>
    <input
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Nombre"
    />
    <input
      type="text"
      value={dni}
      onChange={(e) => setDni(e.target.value)}
      placeholder="DNI"
    />
    <input
      type="text"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      placeholder="Teléfono"
    />
    <input
      type="text"
      value={direccion}
      onChange={(e) => setDireccion(e.target.value)}
      placeholder="Dirección"
    />
    <input
      type="text"
      value={codigoPostal}
      onChange={(e) => setCodigoPostal(e.target.value)}
      placeholder="Código Postal"
    />
    <button onClick={realizarCompra}>Realizar Compra</button>
    <button onClick={ocultarFormularioEmergente}>Cancelar</button>
  </div>
)}

      {mensajeCompra && (
        <div className={styles.MensajeEmergente}>
          <p>{mensajeCompra}</p>
          <button onClick={() => setMensajeCompra("")}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
