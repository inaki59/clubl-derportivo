import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 menu">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="hidden md:block ml-6">
              <Link to="/" className="text-white hover:text-gray-300 px-3 py-2">
                Inicio
              </Link>
              <Link
                to="/nosotros"
                className="text-white hover:text-gray-300 px-3 py-2"
              >
                Nosotros
              </Link>
              <Link
                to="/eliminar-reserva"
                className="text-white hover:text-gray-300 px-3 py-2"
              >
                Eliminar Reserva
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              id="toggleBtn"
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          id="mobileMenu"
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col mt-2">
            <Link
              to="/"
              className="text-white hover:text-gray-300 px-3 py-2 block"
            >
              Inicio
            </Link>
            <Link
              to="/nosotros"
              className="text-white hover:text-gray-300 px-3 py-2 block"
            >
              Nosotros
            </Link>
            <Link
              to="/eliminar-reserva"
              className="text-white hover:text-gray-300 px-3 py-2 block"
            >
              Eliminar Reserva
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
