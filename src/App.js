import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup } from './container';
import Header from './components/Header/Index';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Header />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
