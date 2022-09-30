import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleView } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Logo from '../../src/images/logoHenry.png';
import searchButton from '../../src/images/search_btn.png';
import s from './component_styles/SearchBar.module.css';


export default function SearchBar(props) {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [createBtnTxt, setCreateBtnTxt] = useState('Create New Recipe');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(value);
    };

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(window.innerWidth < 600)
        setCreateBtnTxt('👨‍🍳');
        else
        setCreateBtnTxt('Create New Recipe');
    }, [window.innerWidth]);

    return (
        <div className={s.navbar}>

            <a href="/main" ><img id="logoHenry" src={Logo} width="45" height="40" className={s.HF_logo} alt="logoHenry" /></a>

            <form className={s.searchForm} onSubmit={e => { handleSubmit(e) }}>
                <input type="text" placeholder="I'd like to cook..." value={value} onChange={handleChange} className={s.searchInput} />
                <input type="image" src={searchButton} className={s.submitIcon} alt="submitIcon" />
            </form>

            <Link to="/main/create" onClick={() => dispatch(toggleView(false))} className={s.button_create}>{createBtnTxt}</Link>

        </div>
    )
}