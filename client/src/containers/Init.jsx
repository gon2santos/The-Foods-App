import React from 'react';
import { NavLink } from "react-router-dom";
import plate from '../images/plate.jpeg';
import logo from '../images/logo.png';
import github_logo from '../images/github_logo.png';
import s from './Init.module.css';

function Init() {
  return (
    <div className={s.body}>
      <div className={s.div}>
        <img src={plate} alt="plate" width="612" height="612" className={s.image} />
        <img src={logo} alt="logo" width="727" height="214" className={s.logo} />
        <div className={s.divButton}>
          <NavLink to="/main" className={s.linkStyle}>Find Recipe!</NavLink>
        </div>
      </div>
      <div className={s.div_GH}>
        <a href='https://github.com/gon2santos' className={s.spanStyle}>by Gonzalo Dos Santos
        <img src={github_logo} alt="githubLogo" width="15" height="15" className={s.GH_logo} /></a>
      </div>
    </div>
  );
}

export default Init;
