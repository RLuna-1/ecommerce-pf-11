import React from "react";
import Producto from "./producto";

function Productos(props) {
  const listaProductos = [
    // Aquí coloca tu lista de productos
    // Cada elemento de la lista debe tener los datos necesarios del producto
    {
      id: 1,
      nombre: "Producto 1",
      precio: 10.99,
      descripcion: "Descripción del producto 1",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 15.99,
      descripcion: "Descripción del producto 2",
    },
    // ... más productos
  ];

  return (
    <div className="productos">
      {listaProductos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          descripcion={producto.descripcion}
        />
      ))}
    </div>
  );
}

export default Productos;
