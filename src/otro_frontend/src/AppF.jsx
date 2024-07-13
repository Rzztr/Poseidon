import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/conference_backend';
import { AuthClient } from '@dfinity/auth-client';

const agent = new HttpAgent();
const conference_backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.REACT_APP_CONFERENCE_BACKEND_CANISTER_ID, // Ensure this is configured in your environment
});

const App = () => {
  const [conferences, setConferences] = useState([]);
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    topic: '',
    speaker: '',
    location: '',
    description: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      } else {
        await authClient.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: () => {
            handleAuthenticated(authClient);
          }
        });
      }
    };
    initAuth();
    fetchConferences();
  }, []);

  const handleAuthenticated = async (authClient) => {
    const identity = authClient.getIdentity();
    agent.setIdentity(identity);
    setIsAuthenticated(true);
  };

  const fetchConferences = async () => {
    const result = await conference_backend.getConferences();
    setConferences(result);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addConference = async (e) => {
    e.preventDefault();
    const { day, time, topic, speaker, location, description } = formData;
    await conference_backend.addConference(day, time, topic, speaker, location, description);
    fetchConferences();
    setFormData({
      day: '',
      time: '',
      topic: '',
      speaker: '',
      location: '',
      description: ''
    });
  };

  const deleteConference = async (id) => {
    await conference_backend.deleteConferenceById(id);
    fetchConferences();
  };

  return (
    <div className="App">
      <h1>Conferencias</h1>
      {isAuthenticated ? (
        <div>
          <form onSubmit={addConference}>
            <input type="text" name="day" placeholder="Día" value={formData.day} onChange={handleInputChange} required />
            <input type="text" name="time" placeholder="Hora" value={formData.time} onChange={handleInputChange} required />
            <input type="text" name="topic" placeholder="Tema" value={formData.topic} onChange={handleInputChange} required />
            <input type="text" name="speaker" placeholder="Ponente" value={formData.speaker} onChange={handleInputChange} required />
            <input type="text" name="location" placeholder="Ubicación" value={formData.location} onChange={handleInputChange} required />
            <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} required></textarea>
            <button type="submit">Agregar Conferencia</button>
          </form>
          <ul>
            {conferences.map((conf) => (
              <li key={conf.id}>
                {conf.day} - {conf.time} - {conf.topic} - {conf.speaker} - {conf.location} - {conf.description}
                <button onClick={() => deleteConference(conf.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Por favor, inicia sesión para administrar las conferencias.</p>
      )}
    </div>
  );
};

export default App;
