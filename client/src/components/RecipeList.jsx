import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import fruits_right from '../images/fruits_right.jpg';
import fruits_left from '../images/fruits_left.jpg';
import s from './component_styles/RecipeList.module.css';


export default function RecipeList() {

    const recipes = useSelector((state) => state.recipesLoaded);
    const [rcpIdx, setRcpIdx] = useState(0);
    const [count, setCount] = useState(0);

    const pgNext = function () {
        if (count < (recipes.results.length / 9)-1) {
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

    return (
        <div className={s.body}>
            <div className={s.div_ul}>
                <ul className={s.ul}>
                    {recipes.results.slice(rcpIdx, (rcpIdx + 9)).map((r) =>
                        <li className={s.li}><img src={r.image} className={s.image}/>{r.title}</li>
                    )}
                    <div className={s.div_navBar}>
                        <button className={s.nav_button} onClick={pgPrev}>&lt;</button>
                        <span>{count}/{Math.ceil((recipes.results.length / 9)-1)}</span>
                        <button className={s.nav_button} onClick={pgNext}>&gt;</button>
                    </div>
                </ul>
            </div>
        </div>
    )
}