import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import  Header  from '../Commons/Header';
import { Footer } from '../Commons/Footer';
import { Home } from '../pages/Home';
import "../css/skeleton.css"
import { Reserva } from '../pages/Reserva';
import { NotFound } from '../Commons/NotFound';
import { Nosotros } from '../Commons/Nosotros';
import { DeleteReserva } from '../pages/DeleteReserva';
const MyRouter = () => {
  const Layout = () => {
    return (
      <>
      <div className="wrapper">
        <Header />
        <div className="content-main">
        <Outlet />
        </div>
        <Footer />
        </div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reserva/:deporte" element={<Reserva/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path='/eliminar-reserva' element={<DeleteReserva/>} />
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
