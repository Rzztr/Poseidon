import React from 'react';

const Programas = () => {
  const schedule = [
    {
      day: 'Lunes',
      events: [
        { time: '10:00 AM', topic: 'Importancia del Agua Reutilizada' },
        { time: '02:00 PM', topic: 'Soluciones Innovadoras para el Desabasto de Agua' },
      ],
    },
    {
      day: 'Martes',
      events: [
        { time: '11:00 AM', topic: 'Medidor de Caudal y su Uso' },
        { time: '03:00 PM', topic: 'Sistemas de Riego por Goteo' },
      ],
    },
    {
      day: 'Miércoles',
      events: [
        { time: '09:00 AM', topic: 'Filtros de Agua Eficientes' },
        { time: '01:00 PM', topic: 'Suministro Inteligente de Agua basado en IoT' },
      ],
    },
    {
      day: 'Jueves',
      events: [
        { time: '10:00 AM', topic: 'Impacto Ambiental de la Reutilización del Agua' },
        { time: '02:00 PM', topic: 'Proyectos Comunitarios de Agua' },
      ],
    },
    {
      day: 'Viernes',
      events: [
        { time: '11:00 AM', topic: 'Educación y Conciencia sobre el Agua' },
        { time: '03:00 PM', topic: 'Técnicas de Conservación de Agua' },
      ],
    },
  ];

  return (
    <section className="mt-5 text-center">
      <h1>eventos programados</h1>
      <div className="container mt-4">
        {schedule.map((daySchedule, index) => (
          <div key={index} className="card mb-3">
            <div className="card-header">
              <h4>{daySchedule.day}</h4>
            </div>
            <div className="card-body">
              {daySchedule.events.map((event, idx) => (
                <div key={idx} className="row mb-2">
                  <div className="col-md-4">
                    <strong>{event.time}</strong>
                  </div>
                  <div className="col-md-8">
                    <p>{event.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programas;
