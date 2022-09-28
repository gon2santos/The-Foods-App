import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { getRecipes, toggleView } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import fruits_right from '../images/fruits_right.jpg';
import fruits_left from '../images/fruits_left.jpg';
import s from './Main.module.css';


function Main() {
  const dispatch = useDispatch();
  const showRecipes = useSelector((state) => state.showRecipes);

  const onSearch = (value) => {
    console.log("Searched for : " + value);
    dispatch(getRecipes(value));
    dispatch(toggleView(true));
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <div className={s.body}>
        <img className={s.img_r} src={fruits_right} alt="fruits_right"/>
        {showRecipes ? <RecipeList /> : <Outlet />}
        <img className={s.img_l} src={fruits_left} alt="fruits_left"/>
      </div>
    </div>
  );
}

export default Main;
