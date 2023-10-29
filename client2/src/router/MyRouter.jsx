import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import  Header  from '../Commons/Header';
import { Footer } from '../Commons/Footer';
import { Home } from '../pages/Home';
import "../css/skeleton.css"
import { Reserva } from '../pages/Reserva';
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
          <Route path="/contacto" element={<h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
