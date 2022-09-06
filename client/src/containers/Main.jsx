import React /* ,{ useState }  */ from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { getRecipes, getDetail } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';


function Main() {
  const dispatch = useDispatch();

  const onSearch = (value) => {
    console.log("Searched for : " + value);
    dispatch(getRecipes(value));
  };

  return (
    <div>
      {document.body.style = 'background: #d2d3d5;'}
      <SearchBar onSearch={onSearch}/>
      <RecipeList/>
      <Outlet />
    </div>
  );
}

export default Main;
