import './Init.css'; 
import React from 'react';
import { Link } from "react-router-dom";

function Init() {
  return (
    <div className="Init">
      <h1>Init component!</h1>
      <button><Link to="/home">Home</Link></button>
    </div>
  );
}

export default Init;
