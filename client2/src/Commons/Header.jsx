import React, { useState } from 'react';

 const Header = () => {
const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a className="text-white font-bold text-xl" href="#">
              Logo
            </a>
            <div className="hidden md:block ml-6">
              <a className="text-white hover:text-gray-300 px-3 py-2" href="#">
                Inicio
              </a>
              <a className="text-white hover:text-gray-300 px-3 py-2" href="#">
                Menú
              </a>
              <a className="text-white hover:text-gray-300 px-3 py-2" href="#">
                Nosotros
              </a>
              <a className="text-white hover:text-gray-300 px-3 py-2" href="#">
                Contacto
              </a>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobileMenu"
        className={`md:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <a className="block text-white hover:text-gray-300 px-3 py-2" href="#">
          Inicio
        </a>
        <a className="block text-white hover:text-gray-300 px-3 py-2" href="#">
          Menú
        </a>
        <a className="block text-white hover:text-gray-300 px-3 py-2" href="#">
          Nosotros
        </a>
        <a className="block text-white hover:text-gray-300 px-3 py-2" href="#">
          Contacto
        </a>
      </div>
    </nav>
  )
}
export default  Header;
