import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { useParams } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'; // Asegúrate de tener esta dependencia instalada
import dayGridPlugin from '@fullcalendar/daygrid'; // Asegúrate de tener esta dependencia instalada
import timeGridPlugin from '@fullcalendar/timegrid'; // Asegúrate de tener esta dependencia instalada
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import Swal from 'sweetalert2'
import es from 'date-fns/locale/es';

import esLocale from '@fullcalendar/core/locales/es'; 
import Autocomplete from '../form/Autocomplete';


export const Reserva = () => {
  registerLocale('es', es)
  const calendarRef = useRef(null); // Referencia al componente FullCalendar
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  const [eventosFiltered,setEventosFiltered]=useState([]);
  const [eventos,setEventos]=useState([]);
  const [pistaSeleccionada, setPistaSeleccionada] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState('08:00'); // Estado para almacenar la hora seleccionada
  const handleHoraChange = (e) => {
  const selectedHour = e.target.value;
  setHora(selectedHour);
};
    const { deporte } = useParams();
      const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    duracion: '',
    correo: '',
  });
  const handleSeleccionPista = (pista) => {
    setPistaSeleccionada(pista);
  };
  const handleChangeDuracion = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const duracion = selectedOption.value;
  
    setFormData({
      ...formData,
      duracion
    });
  };
  const getDataFilter=()=>{
    const eventosFiltrados = eventos.filter(evento => evento.pista === pistaSeleccionada);
    console.log("esto se debería mostrar",eventosFiltrados)
    setEventosFiltered(eventosFiltrados);
  }
  useEffect(()=>{
    getDataFilter();
       // Filtrar eventos por pista seleccionada y guardar en eventosFiltered
   
  },[pistaSeleccionada])
  useEffect(()=>{
    console.log("eventos ",eventos)
    getDataFilter();
    console.log("view",eventosFiltered)
  },[eventos])
    // Función que se ejecutará cuando se intente agregar un evento
    const handleAddEvent = (nuevoEvento) => {
      // Filtrar eventos por pista seleccionada
      const eventosEnPistaSeleccionada = eventos.filter(evento => evento.pista === pistaSeleccionada);
    
      // Validar si el evento colisiona con otros eventos en la misma pista
      const colisionPistaSeleccionada = eventosEnPistaSeleccionada.some(evento => (
        nuevoEvento.start < evento.end && nuevoEvento.end > evento.start
      ));
    
      if (colisionPistaSeleccionada) {
        Swal.fire({
          title: "Error",
          text: "La reserva colisiona con otros eventos en la misma pista.",
          icon: 'error'
        });
      } else {
        // Agregar el evento si no hay colisiones
        setEventos([...eventos, nuevoEvento]);
    
     
        
      }
    };
    
    
  const calendar = (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      events={eventosFiltered}
      locale={esLocale}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      allDaySlot={false}
      slotMinTime='08:00:00'
      slotMaxTime='23:00:00'
      eventAdd={handleAddEvent}
    />
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const agregarEvento = (evento) => {
    setEventos([...eventos, evento]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(pistaSeleccionada.length>0){
    const duracionEnMinutos = parseInt(formData.duracion);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + duracionEnMinutos);
  
    // Verificar que la hora final no supere las 22:00
    if (endDate.getHours() >= 22) {
      Swal.fire({
        title: "Error",
        text: "La reserva no puede superar las 22:00.",
        icon: 'error'
      });
      return;
    }
  
    const eventosEnMismaPista = eventos.filter(evento => (
      evento.pista === pistaSeleccionada &&
      evento.end > startDate &&
      evento.start < endDate
    ));
  
    if (eventosEnMismaPista.length > 0) {
      Swal.fire({
        title: "Error",
        text: "No se puede reservar en este horario y pista debido a una colisión de reserva.",
        icon: 'error'
      });
    } else {
      handleAddEvent({
        title: formData.nombre,
        start: startDate,
        end: endDate,
        deporte: deporte,
        pista: pistaSeleccionada,
        correo: formData.correo
      });
  
      setFormData({
        nombre: '',
        fecha: '',
        hora: '',
        duracion: '',
        correo: '',
      });
    }
    }else{
      Swal.fire({
        title: "Error",
        text: "Escoge una pista a seleccionar",
        icon: 'error'
      });
    }
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
          <DatePicker 
            locale="es" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeIntervals={15}
              minDate={new Date()}
              minTime={new Date().setHours(8, 0, 0)}
              maxTime={new Date().setHours(22, 0, 0)}
              dateFormat="d/MM/yyyy h:mm aa"
              className="flex-grow-1"
               />
          {/* <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          /> */}
        </div>
        <div className="mb-4 w-100">

        </div>
        <div className="mb-4">
          <label htmlFor="duracion" className="block text-gray-700 font-bold mb-2">
            Duración (en minutos)
          </label>
          <select
  id="duracion"
  name="duracion" // Asegúrate de que el name sea "duracion"
  value={formData.duracion}
  onChange={handleChangeDuracion}
  className="border border-gray-300 p-2 w-full"
>
  <option value="60" >60 minutos (1 hora)</option>
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
        <div className="mb-4">




        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
      </div>
      <div className="w-full sm:w-1/2 p-4">
        <Autocomplete onSeleccionPista={handleSeleccionPista} pista={pistaSeleccionada}/>
        {calendar}
      </div>
    </div>
  </div>
  )
}
