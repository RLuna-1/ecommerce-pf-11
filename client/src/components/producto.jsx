import React from 'react';


const Producto = () => {
    const listaProducto = [
        {
          id: 1,
          nombre: "Producto 1",
          precio: 10.99,
          descripcion: "Descripción del producto 1",
        }
      ];
  return (
    <div>
    {listaProducto.map((producto) => (
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

export default Producto;
