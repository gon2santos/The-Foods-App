import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>App component!</h1>
      <Outlet />
    </div>
  );
}

export default App;
