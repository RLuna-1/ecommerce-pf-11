import React, { useState } from "react";
import ventas from "./ventas"; //estado global de todas las ventas

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const VentasTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ventasPerPage = 13; // registro a mostar de las ventas para mostar por página
  const [filterText, setFilterText] = useState(""); // Texto del filtro

  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // esto es un filtro para buscar por  texto ingresado
  const filteredVentas = ventas.filter(
    (venta) =>
      venta.producto.toLowerCase().includes(filterText.toLowerCase()) &&
      (!startDate || venta.fecha >= startDate) && // Filtrar por fecha de inicio
      (!endDate || venta.fecha <= endDate) // Filtrar por fecha de fin
  );

  // se calcula  los índices de la primera y última venta de la página actual
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  const currentVentas = filteredVentas.slice(
    indexOfFirstVenta,
    indexOfLastVenta
  );

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
		<div className='antialiased bg-gray-50 dark:bg-slate-100 h-screen overflow-auto'>
			<div className='flex-wrap flex justify-evenly  items-center mb-4 mt-2'>
				<div className='mb-4'>
					<input
						type='text'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-primary-500 dark:focus:border-primary-500'
						placeholder='Filtrar por producto'
						value={filterText}
						onChange={handleFilterChange}
					/>
				</div>

				<div className='   flex-wrap flex gap-10  items-center mb-4 '>
					<DatePicker
						selected={startDate}
						onChange={handleStartDateChange}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						placeholderText={formattedDate}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-primary-500 dark:focus:border-primary-500'
					/>
					<DatePicker
						selected={endDate}
						onChange={handleEndDateChange}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						placeholderText={formattedDate}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-primary-500 dark:focus:border-primary-500'
					/>
				</div>
			</div>
			<h2 className='p-2 font-bold mb-4'>Ventas</h2>
			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='p-2 border'>ID</th>
						<th className='p-2 border'>Producto</th>
						<th className='p-2 border'>Método de Pago</th>
						<th className='p-2 border'>Cantidad Vendida</th>
						<th className='p-2 border'>Precio</th>
						<th className='p-2 border text-right'>Total</th>
					</tr>
				</thead>
				<tbody>
					{currentVentas.map((venta) => (
						<tr key={venta.id} className='text-center'>
							<td className='p-2 border'>{venta.id}</td>
							<td className='p-2 border'>{venta.producto}</td>
							<td className='p-2 border'>{venta.metodoPago}</td>
							<td className='p-2 border'>
								{venta.cantidadVendida}
							</td>
							<td className='p-2 border'>{venta.precio}</td>
							<td className='p-2 border text-right'>
								{venta.cantidadVendida * venta.precio}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='mt-4 font-bold text-right'>
				Total Vendido: ${totalVendidoRounded}
			</div>

			{/* Paginado */}
			<div className='mt-4 flex justify-center items-center'>
				<button
					className='mx-1 px-2 py-1 rounded bg-gray-300'
					onClick={goToPreviousPage}
					disabled={currentPage === 1}>
					{'<'}
				</button>
				{Array.from({
					length: Math.ceil(filteredVentas.length / ventasPerPage),
				}).map((_, index) => (
					<button
						key={index}
						className={`mx-1 px-2 py-1 rounded ${
							currentPage === index + 1
								? 'bg-blue-500 text-white'
								: 'bg-gray-300'
						}`}
						onClick={() => paginate(index + 1)}>
						{index + 1}
					</button>
				))}
				<button
					className='mx-1 px-2 py-1 rounded bg-gray-300'
					onClick={goToNextPage}
					disabled={
						currentPage ===
						Math.ceil(filteredVentas.length / ventasPerPage)
					}>
					{'>'}
				</button>
			</div>
		</div>
  );
};

export default VentasTable;
