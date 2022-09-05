import React from 'react';
import { NavLink } from "react-router-dom";
import plate from '../images/plate.jpeg';
import logo from '../images/logo.png';
import s from './Init.module.css';

function Init() {
  return (
    <div>
      <div className={s.div}>
        <img src={plate} alt="plate" width="612" height="612" className={s.image} />
        <img src={logo} alt="logo" width="727" height="214" className={s.logo} />
        <div className={s.divButton}>
          <NavLink exact to="/main" className={s.linkStyle}>Find Recipe!</NavLink>
        </div>
      </div>
      <a href='https://github.com/gon2santos' className={s.spanStyle}>by Gonzalo Dos Santos</a>
    </div>
  );
}

export default Init;
