import React from 'react'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'; // Asegúrate de tener esta dependencia instalada
import dayGridPlugin from '@fullcalendar/daygrid'; // Asegúrate de tener esta dependencia instalada
import timeGridPlugin from '@fullcalendar/timegrid'; // Asegúrate de tener esta dependencia instalada


import 'react-big-calendar/lib/css/react-big-calendar.css';
import esLocale from '@fullcalendar/core/locales/es'; 
export const Reserva = () => {
    const { deporte } = useParams();
      const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    duracion: '',
    correo: '',
  });
  const calendar = (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      locale={esLocale}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      events={[
        {
          title: 'Evento 1',
          start: '2023-10-30T10:00:00',
          end: '2023-10-30T12:00:00'
        },
        {
          title: 'Evento 2',
          start: '2023-11-01T14:00:00',
          end: '2023-11-01T16:00:00'
        }
      ]}
    />
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar el formulario
    console.log(formData);
  };
  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full sm:w-1/2 p-4">
      <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hora" className="block text-gray-700 font-bold mb-2">
            Hora
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duracion" className="block text-gray-700 font-bold mb-2">
            Duración (en minutos)
          </label>
          <select
            id="duracion"
            name="duracion"
            value={formData.duracion}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="60">60 minutos (1 hora)</option>
            <option value="90">90 minutos (1 :30 horas)</option>
            <option value="120">120 minutos( 2 horas)</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700 font-bold mb-2">
            Correo
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
      </div>
      <div className="w-full sm:w-1/2 p-4">
        {calendar}
      </div>
    </div>
  </div>
  )
}
