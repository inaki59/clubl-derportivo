import React from 'react';
import { Link } from 'react-router-dom';
 export const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
    <div className="text-center max-h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <Link to="/" className="text-blue-500 hover:underline">Volver a la página de inicio</Link>
    </div>
  </div>
  )
}

