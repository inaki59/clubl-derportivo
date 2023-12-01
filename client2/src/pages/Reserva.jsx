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
  const [isMoreHour,setisMoreHour]=useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  const [eventosFiltered,setEventosFiltered]=useState([]);
  const [eventos,setEventos]=useState([]);
  const [emailError, setEmailError] = useState(false);
  const [pistaSeleccionada, setPistaSeleccionada] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(null); // Estado para almacenar la hora seleccionada
  const handleHoraChange = (e) => {
  const selectedHour = e.target.value;
  setHora(selectedHour);
};
    const { deporte } = useParams();
      const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '60',
    duracion: '',  // Valor por defecto de duración en minutos
    correo: '',
  });
  const handleSeleccionPista = (pista) => {
    setPistaSeleccionada(pista);
  };
  const hourAntiUndefined = () => {
    console.log("hora escogida", hora);
    if (hora === "02:00:00" ) {
      console.log("no haremos ningún cambio");
      return hora;

    }
    else if(hora === "01:30:00"){
      console.log("no haremos ningún cambio");
      return hora
    }
    else {
      console.log("Estableceremos como 01:00:00");
      return "01:00:00";
    }
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
  useEffect(() => {
    console.log(formData.duracion);
    const duracionEnMinutos = parseInt(formData.duracion);
  
    // Calcular las horas y los minutos
    const duracionHoras = Math.floor(duracionEnMinutos / 60);
    const duracionMinutos = duracionEnMinutos % 60;
  
    // Formatear la duración
    const duracionFormateada = `${String(duracionHoras).padStart(2, '0')}:${String(duracionMinutos).padStart(2, '0')}:00`;
  
    // Asegurar que la duración siempre tenga el formato "HH:mm:ss"
    const duracionFinal = `${String(duracionHoras).padStart(2, '0')}:${String(duracionMinutos).padStart(2, '0')}:00`;
  
    setHora(duracionFinal);
    console.log(duracionFinal);
  }, [formData.duracion]);
  
  useEffect(()=>{
    console.log(hora)
  },[hora])
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
    //aqui se mete la data
      const formattedReservationData = {
        nombre: nuevoEvento.title,
        correo: formData.correo, // Assuming this value is constant for now
        fecha: nuevoEvento.start.toISOString().split('T')[0], // Extracting the date part
        hora_inicio: nuevoEvento.start.toISOString().split('T')[1].slice(0, 8), // Extracting the time part
        duracion: hourAntiUndefined(),
        pista: pistaSeleccionada,
        deporte: deporte, // Assuming this value is constant for now
      };
      console.log(formattedReservationData)
      console.log(formData)
    
      const hasConflicts = eventosFiltered.some(existingReservation => {
        const existingStart = new Date(existingReservation.start);
        const existingEnd = new Date(existingReservation.end);
    
        const newStart = new Date(`${formattedReservationData.fecha}T${formattedReservationData.hora_inicio}`);
        const [duracionHoras, duracionMinutos, duracionSegundos] = formattedReservationData.duracion.split(':').map(Number);
        const newEnd = new Date(newStart.getTime() + duracionHoras * 60 * 60 * 1000 + duracionMinutos * 60 * 1000 + duracionSegundos * 1000);
    
        console.log("Nueva reserva:", newStart, "final", newEnd);
        console.log("Reserva existente:", existingStart, "final", existingEnd);
    
        const isSameDay = existingStart.toDateString() === newStart.toDateString();
        console.log(isSameDay)
        console.log(isSameDay && newStart < existingEnd && newEnd > existingStart)
        const isOverlap = isSameDay && newStart < existingEnd && newEnd > existingStart;
    
        return isOverlap;
    });
    
    if (hasConflicts) {
        console.log("¡Conflicto de reservas! No se puede realizar la reserva.");
    } else {
        console.log("Reserva exitosa. Día libre.");
    }
    
    
    
    
    
        try {

          if (!hasConflicts) {
          await addReserva(formattedReservationData);
          
     
          setHora()
          // Refresh the calendar data
          Swal.fire({
            title: "enhorabuena",
            text: "reserva realizada con exito",
            icon: 'success'
          });
          getDataFilter();
        }else{
          Swal.fire({
            title: "Advertencia",
            text: "No puedes hacer la reserva porque ya hay una hecha a esa hora ",
            icon: 'warning'
          });
        }
        } catch (error) {
          console.error('Error adding reservation:', error);
          // Handle the error, show a message, etc.
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
  


  const handleSubmit = (e) => {
    e.preventDefault();
    const duracionEnMinutos = parseInt(formData.duracion);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + duracionEnMinutos);
  

      
    if(pistaSeleccionada.length>0){
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
      console.log()
      handleAddEvent({
        title: formData.nombre,
        start: startDate,
        end: hora,
        deporte: deporte,
        pista: pistaSeleccionada,
        correo: formData.correo
      });
  
      setFormData({
        nombre: '',
        fecha: '',
        hora: '60',
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
  onChange={handleChange}
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
