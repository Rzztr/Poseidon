import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Login.css';  // Archivo CSS para las animaciones

const Login = () => {
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);

  useEffect(() => {
    const imgUrls = [
      'jardin.jpg',
      'poseidon3.jpg',
      'regar.jpg',
    ];

    setImages(imgUrls);

    // Mostrar imágenes una por una con esa madre de tiempo
    imgUrls.forEach((url, index) => {
      setTimeout(() => {
        setShowImages(prevImages => [...prevImages, url]);
      }, index * 500); 
    });
  }, []);

  return (
    <section className="mt-5 text-center">
      <h1>Poseidon</h1>
      <h3>Sistemas de distribución y purificación de agua</h3>
      <p>
        Proyecto ICP Poseidon enfocado a la generación de soluciones para el desabasto/desaprovechamiento del agua basado en filtros de agua, medidor de caudal, sistemas de riego por goteo, suministro inteligente de agua basado en IoT.
      </p>
      <TransitionGroup className="image-grid">
        {showImages.map((url, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            <img src={url} alt={`Imagen ${index + 1}`} className="img-fluid" />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
}

export default Login;
