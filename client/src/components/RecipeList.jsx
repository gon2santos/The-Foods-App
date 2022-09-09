import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toggleView } from "../redux/actions/actions";
/* import fruits_right from '../images/fruits_right.jpg';
import fruits_left from '../images/fruits_left.jpg'; */
import s from './component_styles/RecipeList.module.css';


export default function RecipeList() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipesLoaded);
    const [updateList, setUpdateList] = useState(false);
    const [rcpIdx, setRcpIdx] = useState(0);
    const [count, setCount] = useState(0);
    const [ordStyle, setOrdStyle] = useState(s.desc_order_button);

    const pgNext = function () {
        if (count < (recipes.results.length / 9) - 1) {
            setRcpIdx(rcpIdx + 9);
            setCount(count + 1);
        }
    }
    const pgPrev = function () {
        if (rcpIdx > 8) {
            setRcpIdx(rcpIdx - 9);
            setCount(count - 1);
        }
    }

    const sortListName = () => recipes.results.sort((a, b) => {

        let titleB = a.title.toUpperCase();
        let titleA = b.title.toUpperCase();

        if(ordStyle === s.desc_order_button){
            titleA = a.title.toUpperCase();
            titleB = b.title.toUpperCase();
        }
        
        if (titleA < titleB) {
            setUpdateList(!updateList);
            return -1;
        }
        if (titleA > titleB) {
            setUpdateList(!updateList);
            return 1;
        }
        return 0;
    })

    const sortListHS = () => recipes.results.sort((a, b) => {
        //healthScore
        let hsB = a.healthScore;
        let hsA = b.healthScore;

        if(ordStyle === s.desc_order_button){
            hsA = a.healthScore;
            hsB = b.healthScore;
        }
        
        if (hsA < hsB) {
            setUpdateList(!updateList);
            return -1;
        }
        if (hsA > hsB) {
            setUpdateList(!updateList);
            return 1;
        }
        return 0;
    })

    const changeStyle = () => { ordStyle === s.asc_order_button ? setOrdStyle(s.desc_order_button) : setOrdStyle(s.asc_order_button); }

    return (
        <div className={s.body}>
            <div>
                <ul className={s.ul}>
                    <div className={s.nav_contain}>
                        <button onClick={sortListName}>Sort by name</button>
                        <button onClick={sortListHS}>Sort by Health Score</button>
                        <button onClick={changeStyle} className={ordStyle}>&gt;</button>
                        <div className={s.div_navBar}>
                            <button className={s.nav_button} onClick={pgPrev}>&lt;</button>
                            <span>{count}/{Math.ceil((recipes.results?.length / 9) - 1)}</span>
                            <button className={s.nav_button} onClick={pgNext}>&gt;</button>
                        </div>
                    </div>
                    {recipes.results?.slice(rcpIdx, (rcpIdx + 9)).map((r) =>
                        <li key={r.id} className={s.li}><img src={r.image} className={s.image} alt="recipePicture" /><Link to={`recipe/${r.id}/detail`} onClick={() => dispatch(toggleView(false))} className={s.link_component}>{r.title}</Link></li>
                    )}
                </ul>
            </div>
        </div>
    )
}