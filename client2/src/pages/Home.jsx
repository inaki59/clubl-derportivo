import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/center.css"

export const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="centrado"> 
       <div className="w-4/5 h-5/6 border border-gray-300 bg-white shadow-md rounded-md flex space-x-4 justify-center flex-col sm:flex-row items-center">
        <Link to="/reserva/tenis">
         <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-20 h-20 p ${isHovered ? "hover:shadow-lg hover:shadow-green-300 transition-all transition-duration-300" : ""}`} 
          width="4em" 
          height="4em" 
          viewBox="0 0 256 256"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <path fill="currentColor" d="M200.16 55.88a102 102 0 1 0 0 144.24a101.4 101.4 0 0 0 0-144.24ZM64.33 64.36a89.62 89.62 0 0 1 57.25-26.07a89.32 89.32 0 0 1-26.12 57.18a89.38 89.38 0 0 1-57.21 26.11a89.61 89.61 0 0 1 26.08-57.22ZM38.2 133.63A101.36 101.36 0 0 0 104 104a101.24 101.24 0 0 0 29.68-65.72a89.76 89.76 0 0 1 84.17 84.13a102 102 0 0 0-95.43 95.39a89.76 89.76 0 0 1-84.22-84.17Zm153.47 58a89.63 89.63 0 0 1-57.25 26.06a89.94 89.94 0 0 1 83.33-83.28a89.61 89.61 0 0 1-26.08 57.23Z"/>
        </svg>
        </div> 
        </Link>

        <Link to="/reserva/baloncesto">
        <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-20 h-20 ${isHovered ? "hover:shadow-lg hover:shadow-green-300 transition-all transition-duration-300" : ""}`} 
          width="4em" 
          height="4em" 
          viewBox="0 0 256 256"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM60 72.17A87.2 87.2 0 0 1 79.63 120H40.37A87.54 87.54 0 0 1 60 72.17ZM136 120V40.37a87.59 87.59 0 0 1 48.68 20.37A103.06 103.06 0 0 0 160.3 120Zm-16 0H95.7a103.06 103.06 0 0 0-24.38-59.26A87.59 87.59 0 0 1 120 40.37Zm-40.37 16A87.2 87.2 0 0 1 60 183.83A87.54 87.54 0 0 1 40.37 136Zm16.07 0H120v79.63a87.59 87.59 0 0 1-48.68-20.37A103.09 103.09 0 0 0 95.7 136Zm40.3 0h24.3a103.09 103.09 0 0 0 24.38 59.26A87.59 87.59 0 0 1 136 215.63Zm40.37 0h39.26A87.54 87.54 0 0 1 196 183.83A87.2 87.2 0 0 1 176.37 136Zm0-16A87.2 87.2 0 0 1 196 72.17A87.54 87.54 0 0 1 215.63 120Z"/>
        </svg>
        </div>
        </Link>

        <Link to="/reserva/futbol">
        <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-20 h-20 ${isHovered ? "hover:shadow-lg hover:shadow-green-300 transition-all transition-duration-300" : ""}`} 
          width="4em" 
          height="4em" 
          viewBox="0 0 32 32"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3zm0 2c.602 0 1.176.063 1.75.156L16 6.406l-1.75-1.25A11.21 11.21 0 0 1 16 5zm-4.188.844l3.594 2.625l.594.437l.594-.437l3.593-2.625a11.074 11.074 0 0 1 4.125 2.968l-1.375 4.282l-.218.687l.593.406l3.625 2.657a10.996 10.996 0 0 1-1.53 4.843h-5.282l-.219.688l-1.406 4.344a11.12 11.12 0 0 1-5.094-.031l-1.375-4.282l-.219-.687H6.595c-.875-1.438-1.395-3.098-1.532-4.875l3.594-2.625l.594-.406l-.219-.688l-1.406-4.25a11.007 11.007 0 0 1 4.188-3.031zM16 10.094l-.594.437l-4.562 3.313l-.563.437l.219.688l1.75 5.344l.219.687h7.062l.219-.688l1.75-5.343l.219-.688l-.563-.437l-4.562-3.313zm9.75.812a10.947 10.947 0 0 1 1.094 3.406l-1.782-1.28zm-19.531.063l.687 2.062l-1.75 1.281A10.906 10.906 0 0 1 6.22 10.97zM16 12.594l3.375 2.437L18.094 19h-4.188l-1.281-3.969zm5.594 11.094h2.25a10.75 10.75 0 0 1-2.938 2.156zm-13.438.03h2.188l.687 2.095a11.069 11.069 0 0 1-2.875-2.094z"/>
        </svg>
      
        </div>
        </Link>
        <div>
        <Link to="reserva/padel">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-20 h-20 ${isHovered ? "hover:shadow-lg hover:shadow-green-300 transition-all transition-duration-300" : ""}`} 
          width="4em" 
          height="4em" 
          viewBox="0 0 24 24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
       
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"/>
            <path d="M18.572 4.462c-2.667 4.53-2.667 9.723 0 15.076M5.428 4.462c2.667 4.53 2.667 9.723 0 15.076"/>
          </g>
        </svg>
        </Link>
        </div>
      </div>
    </div>  
  );
};
