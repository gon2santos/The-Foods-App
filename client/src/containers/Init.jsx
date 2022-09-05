import React from 'react';
import { Link } from "react-router-dom";
import plate from '../images/plate.jpeg';
import logo from '../images/logo.png';
import s from './Init.module.css';

const spanStyle = {
  color: 'coral',
  position: 'absolute',
  right: '5%',
  fontSize: '12px'
}

function Init() {
  return (
    <div>
      <div className={s.div}>
        <img src={plate} alt="plate" width="612" height="612" className={s.image} />
        <img src={logo} alt="logo" width="727" height="214" className={s.logo} />
        <div className={s.divButton}>
          <button className={s.button}><Link to="/home" className={s.linkStyle}>Start</Link></button>
        </div>
      </div>
      <span class="Init_txt__3lp-9" style={spanStyle}>by Gonzalo Dos Santos Necchi</span>
    </div>
  );
}

export default Init;
