import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleView } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Logo from '../../src/images/logoHenry.png';
import searchButton from '../../src/images/search_btn.png';
import s from './component_styles/SearchBar.module.css';


export default function SearchBar(props) {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(value);
    };

    return (
        <div className={s.navbar}>

            <a href="/main" ><img id="logoHenry" src={Logo} width="45" height="40" className={s.HF_logo} alt="logoHenry" /></a>

            <form className={s.searchForm} onSubmit={e => { handleSubmit(e) }}>
                <input type="text" placeholder="I'd like to make..." value={value} onChange={handleChange} className={s.searchInput} />
                <input type="image" src={searchButton} className={s.submitIcon} alt="submitIcon" />
            </form>
            
            <Link to="/main/create" onClick={() => dispatch(toggleView(false))} className={s.button_create}>Create New Recipe</Link>

        </div>
    )
}