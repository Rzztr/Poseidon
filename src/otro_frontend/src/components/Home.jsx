import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react";
import * as otro_backend from "declarations/otro_backend";
import { useConnect } from "@connect2ic/react";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { principal } = useConnect();

  function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  onElementAvailable(".ii-styles", () => {
    const btn2 = Array.from(document.getElementsByClassName('ii-styles'));

    const custom_style = {
      color: "red",
      backgroundColor: "blue",
      padding: "3px",
      marginLeft: "4px",
    };

    Object.assign(btn2[0].style, custom_style);

    const texto = Array.from(document.getElementsByClassName('button-label'));
    if (texto[0]) texto[0].remove();

    const img = Array.from(document.getElementsByClassName('img-styles'));
    img[0].style.height = "25px";
  });

  onElementAvailable(".connect-button", () => {
    const btn = Array.from(document.getElementsByClassName('connect-button'));
    const custom_style = {
      backgroundColor: "blue",
      fontSize: "17px",
    };
    Object.assign(btn[0].style, custom_style);
    if (btn[0].textContent === 'Connect' || btn[0].textContent === 'Conectar II')
      btn[0].textContent = 'Solicitar asesoría/presupuesto';
    else btn[0].textContent = 'Ver paquetes';
  });

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">ICP Credentials</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link">Bienvenida</Link>
              </li>
              <li className="nav-item">
                <Link to='/areas' className="nav-link">Áreas</Link>
              </li>
              <li className="nav-item">
                <Link to='/menu' className="nav-link">Menú</Link>
              </li>
              <li className="nav-item">
                <Link to='/programas' className="nav-link">Programas</Link>
              </li>
            </ul>
            {principal ? (
              <>
                <span className="navbar-text me-2">Inicia sesión</span>
                <ConnectButton />
                <ConnectDialog />
              </>
            ) : (
              <>
                <span className="navbar-text me-2">Inicia sesión</span>
                <ConnectButton />
                <ConnectDialog />
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mt-4" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-center" style={{ color: '#343a40' }}>Bienvenido a nuestro Proyecto</h1>
        <p className="text-center">Este es el texto de introducción a nuestro proyecto. Aquí puedes describir brevemente el objetivo y propósito de tu proyecto.</p>
      </div>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/programas" element={<Programas />} />
      </Routes>
    </BrowserRouter>
  );
};

const Bienvenida = () => (
  <div className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ color: '#343a40' }}>Bienvenida</h2>
    <p>Contenido de la página de bienvenida.</p>
  </div>
);

const Areas = () => (
  <div className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ color: '#343a40' }}>Áreas</h2>
    <p>Contenido de la página de áreas.</p>
  </div>
);

const Menu = () => (
  <div className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ color: '#343a40' }}>Menú</h2>
    <p>Contenido de la página de menú.</p>
  </div>
);

const Programas = () => (
  <div className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ color: '#343a40' }}>Programas</h2>
    <p>Contenido de la página de programas.</p>
  </div>
);

const client = createClient({
  canisters: {
    otro_backend,
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai" })
  ],
  globalProviderConfig: {
    dev: true,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <Home />
  </Connect2ICProvider>
);
