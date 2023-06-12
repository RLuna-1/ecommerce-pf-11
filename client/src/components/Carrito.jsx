import React, { useState } from "react";
import styles from "../css/Carrito.module.css";
import { useDispatch, useSelector } from "react-redux";
import { remove1FromCart, removeFromCart } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import axios from "axios";

const Carrito = () => {
  const cart = useSelector((state) => state.cart);

  const price = cart
    .map((ele) => ele.price * ele.quantity)
    .reduce(function (acumulador, elemento) {
      return acumulador + elemento;
    }, 0);
  console.log(price);
  const dispatch = useDispatch();

  console.log(cart);
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
  const eliminarProducto = (id) => {
    dispatch(removeFromCart(id));
  };

  const mostrarFormularioEmergente = () => {
    setMostrarFormulario(true);
    setMostrarBotonComprar(false); // Oculta el primer botón "Comprar"
  };

  const ocultarFormularioEmergente = () => {
    setMostrarFormulario(false);
    setMostrarBotonComprar(true); // Muestra el primer botón "Comprar" nuevamente
  };

  const realizarCompra = async () => {
    if (
      nombre !== "" &&
      dni !== "" &&
      telefono !== "" &&
      direccion !== "" &&
      codigoPostal !== ""
    ) {
      try {
        // Crear un objeto con los detalles de los productos
        const productos = cart.map((producto) => ({
          title: producto.name,
          quantity: producto.quantity,
          price: producto.price,
        }));

        // Realizar la solicitud POST a tu ruta de Mercado Pago
        const response = await axios.post("/ruta-de-mercado-pago", productos);

        // Resto del código para manejar la respuesta de Mercado Pago

        setMensajeCompra("¡La compra se ha realizado exitosamente!");
      } catch (error) {
        console.error("Error al realizar el pago:", error);
        setMensajeCompra(
          "Ha ocurrido un error al realizar el pago. Por favor, intenta nuevamente."
        );
      }
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
          <h4>Subtotal: {producto.price * producto.quantity}</h4>
          <button
            className={styles.BotonEliminar}
            onClick={() => eliminarProducto1(producto.id)}
          >
            Eliminar 1 Producto
          </button>
          <button
            className={styles.BotonEliminar}
            onClick={() => eliminarProducto(producto.id)}
          >
            Eliminar Productos
          </button>
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
        <Link to={`/home`}>Mas Productos</Link>
      </button>

      {mostrarFormulario && (
        <div className={styles.ElementoCompra}>
          <h2>Formulario de Compra</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />
          <button className={styles.Comprar} onClick={realizarCompra}>
            Comprar
          </button>
          <button
            className={styles.Comprar}
            onClick={ocultarFormularioEmergente}
          >
            Cancelar
          </button>
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