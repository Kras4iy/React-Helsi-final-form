import React from 'react';
import { PersonForm } from './components/PersonForm/PersonForm';
import './App.scss';

export const App = () => (
  <div className="container">
    <h2>Дані пацієнта</h2>
    <PersonForm />
  </div>
);
