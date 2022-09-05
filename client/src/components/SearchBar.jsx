import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../src/images/logoHenry.png';
import searchButton from '../../src/images/search_btn.png';
import s from './component_styles/SearchBar.module.css';

export default function SearchBar(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(value);
    };

    return (
        <header className={s.navbar}>
            <div>
                <a href="/main" ><img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" /></a>
            </div>
            <form className={s.searchForm} onSubmit={e => { handleSubmit(e) }}>
                <input type="text" placeholder="Today I'd like to make..." value={value} onChange={handleChange} className={s.searchInput}/>
                <input type="image" src={searchButton} className={s.submitIcon}/> 
                {/* <input type="submit" value="Agregar" /> */}
            </form>
            <nav>
                <NavLink exact to="/main/create" className={s.listItem}>Create New Recipe</NavLink>
            </nav>
        </header>
    )
}