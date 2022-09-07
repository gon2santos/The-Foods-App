import React /* ,{ useState }  */ from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { getRecipes, getDetail } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';


function Main() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipesLoaded);
  console.log(recipes.result);

  const onSearch = (value) => {
    console.log("Searched for : " + value);
    dispatch(getRecipes(value));
  };

  return (
    <div>
      <SearchBar onSearch={onSearch}/>
      { recipes.results ? <RecipeList/> : null }
      <Outlet />
    </div>
  );
}

export default Main;
