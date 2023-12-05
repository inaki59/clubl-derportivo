import React, { useState } from 'react';
import { deleteReserva as eliminarReservaApi } from '../api/clientapi';  // Cambié el nombre aquí
import Swal from 'sweetalert2'
import "../css/delete.css";

export const DeleteReserva = () => {
  // Estado para almacenar el valor del campo de texto
  const [codigoReserva, setCodigoReserva] = useState('');

  // Manejador de cambios en el campo de texto
  const handleCodigoChange = (event) => {
    setCodigoReserva(event.target.value);
  };

  const deleteReserva =async() => {
    if (codigoReserva.length !== 5) {
      Swal.fire({
        title: "Advertencia",
        text: "Formato de código incorrecto",
        icon: 'warning'
      });
    } else {
      let resultado = await eliminarReservaApi(codigoReserva);  // Cambié el nombre aquí
      console.log(resultado)
      if(resultado.status==200){
        Swal.fire({
          title: "",
          text: "Reserva eliminada exitosamente",
          icon: 'success'
        });
      }
      setCodigoReserva("")
    }
  }

  return (
    <div className="delete">
      <div className="card">
        <h2 className="text-2xl mb-3">Eliminación de reserva</h2>
        
        {/* Campo de texto */}
        <label>Código</label>
        <input
          type="text"
          className='mr-2 ml-2 my-input'  
          value={codigoReserva}
          onChange={handleCodigoChange}
        />
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={deleteReserva}
        >
          Cancelar reserva
        </button>
      </div>
    </div>
  );
};
