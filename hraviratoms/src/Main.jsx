import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import GuestList from './GuestList';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/guestlist" element={<GuestList />} />
    </Routes>
  );
}

export default Main;
