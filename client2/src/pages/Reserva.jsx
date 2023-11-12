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
import {getreservaByPista ,addReserva} from '../api/clientapi'
import esLocale from '@fullcalendar/core/locales/es'; 
import Autocomplete from '../form/Autocomplete';
import moment from 'moment';
import { formatDate } from '@fullcalendar/core';


export const Reserva = () => {
  registerLocale('es', es)
  const calendarRef = useRef(null); // Referencia al componente FullCalendar
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  const [eventosFiltered,setEventosFiltered]=useState([]);
  const [eventos,setEventos]=useState([]);
  const [emailError, setEmailError] = useState(false);
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
  const getDataFilter = async () => {
    let eventosFiltrados = [];
  
    if (pistaSeleccionada !== '') {
      const reservasData = await getreservaByPista(deporte, pistaSeleccionada);
      console.log("hola", reservasData);
  
      // Assuming each reserva in reservasData is an object with a duration property
      eventosFiltrados = reservasData?.map(reserva => {
        const { fecha, hora_inicio, duracion, nombre, pista } = reserva;
      
        // Parse duration and add it to the start time
        const startTime = new Date(`${fecha}T${hora_inicio}`);
        const durationInSeconds = moment.duration(duracion).asSeconds();
        const endTime = new Date(startTime.getTime() + durationInSeconds * 1000);
      
        // Format the data for FullCalendar
        return {
          title: nombre,
          start: startTime,
          end: endTime,
          pista: pista,
        };
      });
      
    }
  
    console.log("esto se debería mostrar", eventosFiltrados);
    setEventosFiltered(eventosFiltrados);
  };
  
  useEffect(()=>{
    getDataFilter();
       
   
  },[pistaSeleccionada])
  useEffect(()=>{
    console.log("eventos ",eventos)
    getDataFilter();
    console.log("view",eventosFiltered)
  },[eventos])
    // Función que se ejecutará cuando se intente agregar un evento
    const handleAddEvent = async (nuevoEvento) => {
      console.log("add ", nuevoEvento);
    
      // Calculate duration in minutes
      const durationInMinutes = Math.floor((nuevoEvento.end - nuevoEvento.start) / (1000 * 60));
    
      const formattedReservationData = {
        nombre: nuevoEvento.title,
        correo: formData.correo, // Assuming this value is constant for now
        fecha: nuevoEvento.start.toISOString().split('T')[0], // Extracting the date part
        hora_inicio: nuevoEvento.start.toISOString().split('T')[1].slice(0, 8), // Extracting the time part
        duracion: `${Math.floor(durationInMinutes / 60)}:${durationInMinutes % 60}:00`,
        pista: pistaSeleccionada,
        deporte: deporte, // Assuming this value is constant for now
      };
      console.log(formData)
    
      // Check for collisions with existing events
      const colisionPistaSeleccionada = eventos.some(evento => (
        nuevoEvento.start < evento.end && nuevoEvento.end > evento.start
      ));
    
      console.log("nuevo evento ", nuevoEvento);
    
      if (colisionPistaSeleccionada) {
        Swal.fire({
          title: "Error",
          text: "La reserva colisiona con otros eventos en la misma pista.",
          icon: 'error'
        });
      } else {
        try {
          // Add the reservation
          await addReserva(formattedReservationData);
          // Refresh the calendar data
          Swal.fire({
            title: "enhorabuena",
            text: "reserva realizada con exito",
            icon: 'success'
          });
          getDataFilter();
        } catch (error) {
          console.error('Error adding reservation:', error);
          // Handle the error, show a message, etc.
        }
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
    // Validar formato del correo
    if (name === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value));
    }
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
       // Validación de campos requeridos
       const requiredFields = ['nombre', 'correo'];
       const missingFields = requiredFields.filter(field => !formData[field]);
   
       if (missingFields.length > 0) {
         Swal.fire({
           title: "Error",
           text: `Por favor, completa los campos: ${missingFields.join(', ')}.`,
           icon: 'error'
         });
         return;
       }
  
    const eventosEnMismaPista = eventos.filter(evento => (
      evento.pista === pistaSeleccionada &&
      (evento.end > startDate || evento.start < endDate)
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
            className={`border border-gray-300 p-2 w-full ${emailError ? 'border-red-500 text-red-500' : ''}`}
          />
             {emailError && (
                  <p className="text-red-500 text-sm mt-1">Ingresa un correo electrónico válido.</p>
                )}
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
