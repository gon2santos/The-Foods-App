import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toggleView } from "../redux/actions/actions";
/* import fruits_right from '../images/fruits_right.jpg';
import fruits_left from '../images/fruits_left.jpg'; */
import s from './component_styles/RecipeList.module.css';


export default function RecipeList() {
    const dispatch = useDispatch();
    const store_recipes = useSelector((state) => state.recipesLoaded.results);
    const [rendered_recipes, setRendered_recipes] = useState();
    const [updateList, setUpdateList] = useState(false);
    const [rcpIdx, setRcpIdx] = useState(0);
    const [count, setCount] = useState(0);
    const [ordStyle, setOrdStyle] = useState(s.desc_order_button);
    const [accStyle, setAccStyle] = useState(s.inactive);

    let vegan = false;
    let vegetarian = false;
    let glutenFree = false;
    let Ketogenic = false;
    let LactoOvoVegetarian = false;
    let Pescetarian = false;
    let Paleo = false;
    let Primal = false;
    let LowFODMAP = false;
    let Whole30 = false;
    let DairyFree = false;

    useEffect(() => { setRendered_recipes(store_recipes) }, [store_recipes]);

    const pgNext = function () {
        if (count < (rendered_recipes.length / 9) - 1) {
            setRcpIdx(rcpIdx + 9);
            setCount(count + 1);
        }
    };
    const pgPrev = function () {
        if (rcpIdx > 8) {
            setRcpIdx(rcpIdx - 9);
            setCount(count - 1);
        }
    };

    const sortListName = () => {
        rendered_recipes.sort((a, b) => {

            let titleB = a.title.toUpperCase();
            let titleA = b.title.toUpperCase();

            if (ordStyle === s.desc_order_button) {
                titleA = a.title.toUpperCase();
                titleB = b.title.toUpperCase();
            }

            if (titleA < titleB)
                return -1;
            if (titleA > titleB)
                return 1;
            return 0;
        });
        setUpdateList(!updateList);
    };

    const sortListHS = () => {
        rendered_recipes.sort((a, b) => {
            let hsB = a.healthScore;
            let hsA = b.healthScore;

            if (ordStyle === s.desc_order_button) {
                hsA = a.healthScore;
                hsB = b.healthScore;
            }

            if (hsA < hsB)
                return -1;
            if (hsA > hsB)
                return 1;
            return 0;
        });
        setUpdateList(!updateList);
    };

    const filterList = (e, diet) => { //FILTER FUNCTION V1
        if (diet === 'vegetarian') vegetarian = e.target.checked;
        else if (diet === 'vegan') vegan = e.target.checked;
        else if (diet === 'glutenFree') glutenFree = e.target.checked;
        else if (diet === 'Ketogenic') Ketogenic = e.target.checked;
        else if (diet === 'LactoOvoVegetarian') LactoOvoVegetarian = e.target.checked;
        else if (diet === 'Pescetarian') Pescetarian = e.target.checked;
        else if (diet === 'Paleo') Paleo = e.target.checked;
        else if (diet === 'Primal') Primal = e.target.checked;
        else if (diet === 'LowFODMAP') LowFODMAP = e.target.checked;
        else if (diet === 'Whole30') Whole30 = e.target.checked;
        else if (diet === 'DairyFree') DairyFree = e.target.checked;

        setRendered_recipes(store_recipes);

        if (vegetarian) setRendered_recipes(rendered_recipes.filter(item => item.vegetarian === vegetarian));
        if (vegan) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("vegan", 0)));
        }
        if (glutenFree) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("gluten free", 0)));
        }
        if (Paleo) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("paleolithic", 0)));
        }
        if (Pescetarian) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("pescatarian", 0)));
        }
        if (Ketogenic) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("ketogenic", 0)));
        }
        if (LactoOvoVegetarian) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("lacto ovo vegetarian", 0)));
        }
        if (Primal) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("primal", 0)));
        }
        if (LowFODMAP) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("low FODMAP", 0)));
        }
        if (Whole30) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("whole 30", 0)));
        }
        if (DairyFree) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("dairy free", 0)));
        }

        setAccStyle(s.inactive);
    };

    const handleAccordionButton = () => {
        changeAccStyle();
    };

    const changeOrdStyle = () => { ordStyle === s.asc_order_button ? setOrdStyle(s.desc_order_button) : setOrdStyle(s.asc_order_button); };
    const changeAccStyle = () => { accStyle === s.active ? setAccStyle(s.inactive) : setAccStyle(s.active); };

    return (
        <div className={s.body}>
            <div>
                <ul className={s.ul}>
                    <div className={s.nav_contain}>
                        
                        <div className={s.buttonsOrder}>
                            <div><button className={s.headButtons} onClick={handleAccordionButton}>Sort by diet</button>
                                <div className={accStyle}>
                                    <div><input type="checkbox" id="vegetarian" onChange={e => filterList(e, 'vegetarian')} /><label htmlFor="vegetarian">Vegetarian</label></div>
                                    <div><input type="checkbox" id="vegan" onChange={e => filterList(e, 'vegan')} /><label htmlFor="vegan">Vegan</label></div>
                                    <div><input type="checkbox" id="glutenFree" onChange={e => filterList(e, 'glutenFree')} /><label htmlFor="glutenFree">Gluten Flabel</label></div>
                                    <div><input type="checkbox" id="Ketogenic" onChange={e => filterList(e, 'Ketogenic')} /><label htmlFor="Ketogenic">Ketogenic</label></div>
                                    <div><input type="checkbox" id="LactoVegetarian" onChange={e => filterList(e, 'LactoOvoVegetarian')} /><label htmlFor="LactoVegetarian">Lacto-Olabel Veg</label></div>
                                    <div><input type="checkbox" id="Pescetarian" onChange={e => filterList(e, 'Pescetarian')} /><label htmlFor="Pescetarian">Pescetarian</label></div>
                                    <div><input type="checkbox" id="Paleo" onChange={e => filterList(e, 'Paleo')} /><label htmlFor="Paleo">Paleo</label></div>
                                    <div><input type="checkbox" id="Primal" onChange={e => filterList(e, 'Primal')} /><label htmlFor="Primal">Primal</label></div>
                                    <div><input type="checkbox" id="LowFODMAP" onChange={e => filterList(e, 'LowFODMAP')} /><label htmlFor="LowFODMAP">Low FODMAP</label></div>
                                    <div><input type="checkbox" id="Whole30" onChange={e => filterList(e, 'Whole30')} /><label htmlFor="Whole30">Whole30</label></div>
                                </div></div>
                            <div className={s.row2}><div className={s.column}><button onClick={sortListName} className={s.headButtons}>Sort by name</button>
                            <button onClick={sortListHS} className={s.headButtons}>Sort by Health Score</button></div>
                            <button onClick={changeOrdStyle} className={ordStyle}>&gt;</button></div>
                            <div className={s.div_navBar}>
                                <button className={s.nav_button} onClick={pgPrev}>&lt;</button>
                                <span>{count}/{Math.ceil((rendered_recipes?.length / 9) - 1)}</span>
                                <button className={s.nav_button} onClick={pgNext}>&gt;</button>
                            </div>
                        </div>

                    </div>
                    {rendered_recipes?.slice(rcpIdx, (rcpIdx + 9)).map((r) =>
                        <li key={r.id} className={s.li}><img src={r.image} className={s.image} alt="recipePicture" /><div className={s.column}><Link to={`recipe/${r.id}/detail`} onClick={() => dispatch(toggleView(false))} className={s.link_component}>{r.title}</Link><div><ul className={s.dietsList}>{r.diets?.map(diet => <li key={diet} className={s.row}>&#8226;{diet}&#160;&#160;</li>)}</ul></div></div></li>
                    )}
                </ul>
            </div>
        </div>
    )
}