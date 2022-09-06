import React /* ,{ useState }  */ from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { getRecipes, getDetail } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';


function Main() {
  const dispatch = useDispatch();

  const onSearch = (value) => {
    console.log("Searched for : " + value);
    dispatch(getRecipes(value));
  };

  return (
    <div className="Main">
      <SearchBar onSearch={onSearch}/>
      <Outlet />
    </div>
  );
}

export default Main;
