import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';



function Main() {
  const[recipe, setRecipe] = useState('');

  const onSearch = (value) => {
    console.log("Searched for : " + value);
  };

  return (
    <div className="Main">
      <SearchBar onSearch={onSearch}/>
      <Outlet />
    </div>
  );
}

export default Main;
