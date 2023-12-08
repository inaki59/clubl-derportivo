import React, { useState ,useEffect} from 'react';

const Autocomplete = ({onSeleccionPista,pista ,deporte}) => {
  const handleChange = (e) => {
    const pistaSeleccionada = e.target.value;
    onSeleccionPista(pistaSeleccionada);
  };

  return (
    <div className="max-w-xs mx-auto">
      <label htmlFor="autocomplete" className="block text-gray-700 font-bold mb-2">
        Selecciona pista de {deporte}:
      </label>
      <select
        id="autocomplete"
        name="autocomplete"
        value={pista}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value=""></option>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Autocomplete;
