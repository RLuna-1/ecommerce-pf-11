import React, { useState } from "react";
import styles from "../css/Carrito.module.css";

const Carrito = () => {
  const [productos, setProductos] = useState([
    

  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [mostrarBotonComprar, setMostrarBotonComprar] = useState(true);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
  };

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
      // Realizar lógica de compra aquí (por ejemplo, enviar datos al servidor)
      setMensajeCompra("¡La compra se ha realizado exitosamente!");
    } else {
      setMensajeCompra("Por favor, completa todos los campos del formulario.");
    }
  };

  return (
    <div className={styles.General}>
      {productos.map((producto) => (
        <div key={producto.id} className={styles.Elemento}>
         <img src={producto.imagen} alt='Imagen del producto' />
                    <h1>{producto.titulo}</h1>
                    <h1>$ {producto.precio}</h1>
                    <button className={styles.BotonEliminar} onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </div>
            ))}

      {mostrarBotonComprar && (
        <button
          className={styles.Comprar}
          onClick={mostrarFormularioEmergente}
        >
          Comprar
        </button>
      )}

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
          <button className={styles.Comprar} onClick={ocultarFormularioEmergente}>
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
