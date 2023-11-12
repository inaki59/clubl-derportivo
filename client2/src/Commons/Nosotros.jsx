import React from 'react'
import "../css/center.css"
export const Nosotros = () => {
  return (
<div className="centrado"> 
   
        <div
          className="card rounded-lg shadow-md mb-4"
          style={{
            border: `1px solid #a0cfff`,
          }}
        >
          <h2 className="text-center text-gray-900 font-bold text-xl mb-4">Sobre nosotros</h2>
          <div
            className="flex flex-col justify-center items-center"
          >
            <p className="text-gray-600">
              Somos un equipo de desarrolladores que hemos creado una web para hacer reservas de pistas de deportes.
              Nuestra misión es facilitar a las personas la reserva de pistas de deportes de forma rápida y sencilla.
            </p>
            <p className="text-gray-600">
              Nuestra web está disponible en todo el mundo y ofrece una amplia variedad de pistas de deportes,
              incluyendo pistas de tenis, pádel, baloncesto, fútbol, etc.
            </p>
            <p className="text-gray-600">
              Para realizar una reserva, solo tienes que seleccionar la pista que deseas reservar, la fecha y la hora.
              Recibirás un correo electrónico de confirmación con los detalles de tu reserva.
            </p>
          </div>
        </div>
      </div>
  )
}
