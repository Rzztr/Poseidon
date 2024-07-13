import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Bienvenida from './Bienvenida';


  return (
    <div className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      {principal ? (
        <>
          <h2 style={{ color: '#343a40' }}>Sobre Nuestra Empresa</h2>
          <p>
            Somos una empresa comprometida con el manejo eficiente y sostenible del agua. Ofrecemos soluciones integrales para asegurar que incluso las áreas con recursos hídricos limitados puedan acceder a servicios de calidad.
          </p>
          <h3 style={{ color: '#343a40' }}>Nuestros Servicios</h3>
          <p>
            Proveemos una gama de servicios diseñados para manejar y conservar el agua de manera eficiente:
            <ul>
              <li>Evaluación y gestión de recursos hídricos</li>
              <li>Implementación de sistemas de riego avanzados</li>
              <li>Tratamiento y reutilización de aguas residuales</li>
              <li>Soluciones de almacenamiento de agua</li>
            </ul>
          </p>
          <h3 style={{ color: '#343a40' }}>Cómo Ayudamos en Áreas con Agua Limitada</h3>
          <p>
            En regiones donde el agua es un recurso preciado, implementamos tecnologías de ahorro de agua y estrategias de gestión para maximizar su uso eficiente:
            <ul>
              <li>Instalación de sistemas de captación de agua de lluvia</li>
              <li>Implementación de programas de educación y concientización sobre el uso del agua</li>
              <li>Desarrollo de infraestructura para la distribución eficiente del agua</li>
            </ul>
          </p>
          <h3 style={{ color: '#343a40' }}>Áreas con Suficiente Suministro</h3>
          <p>
            En zonas donde el suministro de agua es adecuado, nos enfocamos en mantener y mejorar la infraestructura existente para asegurar la sostenibilidad a largo plazo:
            <ul>
              <li>Mantenimiento y mejora de redes de distribución</li>
              <li>Monitoreo y control de la calidad del agua</li>
              <li>Promoción de prácticas sostenibles entre las comunidades</li>
            </ul>
          </p>
          <p>Para mayores informes, llame al 449 540 3154</p>
        </>
      ) : (
        <Bienvenida />
      )}
    </div>
  );

export default Areas;
