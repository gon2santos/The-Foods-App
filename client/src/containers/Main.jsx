import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { getRecipes, toggleView } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';


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
      <SearchBar onSearch={onSearch}/>
      { showRecipes ? <RecipeList/> : <Outlet /> }
    </div>
  );
}

export default Main;
