import React from 'react';

function Ordenar({ onOrdenarChange }) {
  const handleOrdenarChange = (event) => {
    const opcionSeleccionada = event.target.value;
    onOrdenarChange(opcionSeleccionada);
  };

  return (
    <div>
      <label htmlFor="ordenar">Ordenar por:</label>
      <select id="ordenar" onChange={handleOrdenarChange}>
        <option value="">Seleccione una opción</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
        <option value="alfabetico">Alfabético</option>
      </select>
    </div>
  );
}

export default Ordenar;
