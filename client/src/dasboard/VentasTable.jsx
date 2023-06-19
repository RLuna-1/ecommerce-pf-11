import React, { useState } from "react";
import ventas from "./ventas";//estado global de todas las ventas

const VentasTable = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const ventasPerPage = 13; // registro a mostar de las ventas para mostar por página
  const [filterText, setFilterText] = useState(""); // Texto del filtro

  // esto es un filtro para buscar por  texto ingresado
  const filteredVentas = ventas.filter((venta) =>
    venta.producto.toLowerCase().includes(filterText.toLowerCase())
  );

  // se calcula  los índices de la primera y última venta de la página actual
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = filteredVentas.slice(indexOfFirstVenta, indexOfLastVenta);

  //se calcula la sumatoria del total vendido para las ventas actuales
  const totalVendido = currentVentas.reduce(
    (total, venta) => total + venta.cantidadVendida * venta.precio,
    0
  );

  // redondear lovendido a 2 decimales
  const totalVendidoRounded = totalVendido.toFixed(2);

  // para cambiar  de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // para retroceder una página
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // para avanzar una página
  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredVentas.length / ventasPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // funcion del cambio en el input de filtro
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setCurrentPage(1); // Reiniciar la página al cambiar el filtro
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <h2 className="p-2 font-bold mb-4">Ventas</h2>

      <div className="mb-4">
        <input
          type="text"
          className="px-2 py-1 rounded border border-gray-300"
          placeholder="Filtrar por producto"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Método de Pago</th>
            <th className="p-2 border">Cantidad Vendida</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentVentas.map((venta) => (
            <tr key={venta.id} className="text-center">
              <td className="p-2 border">{venta.id}</td>
              <td className="p-2 border">{venta.producto}</td>
              <td className="p-2 border">{venta.metodoPago}</td>
              <td className="p-2 border">{venta.cantidadVendida}</td>
              <td className="p-2 border">{venta.precio}</td>
              <td className="p-2 border text-right">
                {venta.cantidadVendida * venta.precio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 font-bold text-right">Total Vendido: ${totalVendidoRounded}</div>

      {/* Paginado */}
      <div className="mt-4 flex justify-center items-center">
        <button
          className="mx-1 px-2 py-1 rounded bg-gray-300"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: Math.ceil(filteredVentas.length / ventasPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className="mx-1 px-2 py-1 rounded bg-gray-300"
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(filteredVentas.length / ventasPerPage)}
        >
          {">"}
        </button>
      </div>
      
    </div>
  );
};

export default VentasTable;
