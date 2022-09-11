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
    }
    const pgPrev = function () {
        if (rcpIdx > 8) {
            setRcpIdx(rcpIdx - 9);
            setCount(count - 1);
        }
    }

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

     /*const [sta_vegan, setVegan] = useState(false);
    const [sta_vegetarian, setVegetarian] = useState(false);
    const [sta_glutenFree, setGlutenFree] = useState(false);

    const filterList = (e, diet) => { //FILTER FUNCTION V2
        vegan = sta_vegan;
        vegetarian = sta_vegetarian;
        glutenFree = sta_glutenFree;

        if (diet === 'vegetarian') {
            vegetarian = e.target.checked;
            setVegetarian(vegetarian);
        }

        if (diet === 'vegan') {
            vegan = e.target.checked;
            setVegan(vegan);
        }

        if (diet === 'glutenFree') {
            glutenFree = e.target.checked;
            setGlutenFree(glutenFree);
        }
        
        let auxRecipes = store_recipes;

        auxRecipes = store_recipes.filter(item => {
            let ret = false;
            if(item.vegetarian === vegetarian){
                if(item.vegan === vegan){
                    if(item.glutenFree === glutenFree){
                        ret = true;
                    }}}
                    return ret;
        });

        setRendered_recipes(auxRecipes);

        console.log(`vegan checked: ${vegan}`);
        console.log(`vegetarian checked: ${vegetarian}`);
        console.log(`glutenFree checked: ${glutenFree}`);
    } */

    const filterList = (e, diet) => { //FILTER FUNCTION V1
        if(diet === 'vegetarian') vegetarian = e.target.checked;             
        else if(diet === 'vegan') vegan = e.target.checked;        
        else if(diet === 'glutenFree') glutenFree = e.target.checked;
        else if(diet === 'Ketogenic') Ketogenic = e.target.checked; 
        else if(diet === 'LactoOvoVegetarian') LactoOvoVegetarian = e.target.checked; 
        else if(diet === 'Pescetarian') Pescetarian = e.target.checked; 
        else if(diet === 'Paleo') Paleo = e.target.checked; 
        else if(diet === 'Primal') Primal = e.target.checked; 
        else if(diet === 'LowFODMAP') LowFODMAP = e.target.checked; 
        else if(diet === 'Whole30') Whole30 = e.target.checked; 
        else if(diet === 'DairyFree') DairyFree = e.target.checked; 

        setRendered_recipes(store_recipes);
        
        if(vegetarian) setRendered_recipes(rendered_recipes.filter(item => item.vegetarian === vegetarian));
        if(vegan) setRendered_recipes(rendered_recipes.filter(item => item.vegan === vegan));
        if(glutenFree) setRendered_recipes(rendered_recipes.filter(item => item.glutenFree === glutenFree));
        if(Paleo) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("paleolithic", 0)));
        };
        if(Pescetarian) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("pescatarian", 0)));
        };
        /* if(Pescetarian) {
            rendered_recipes.forEach(element => console.log(element.diets));
            //setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("pescatarian", 0)));
        }; */
        if(Ketogenic) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("ketogenic", 0)));
        };
        if(LactoOvoVegetarian) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("lacto ovo vegetarian", 0)));
        };
        if(Primal) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("primal", 0)));
        };
        if(LowFODMAP) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("low FODMAP", 0)));
        };
        if(Whole30) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("whole 30", 0)));
        };
        if(DairyFree) {
            setRendered_recipes(rendered_recipes.filter(element => element.diets.includes("dairy free", 0)));
        };
    }

    const changeStyle = () => { ordStyle === s.asc_order_button ? setOrdStyle(s.desc_order_button) : setOrdStyle(s.asc_order_button); }

    return (
        <div className={s.body}>
            <div>
                <ul className={s.ul}>
                    <div className={s.nav_contain}>
                        <div>
                            <div>
                                <span>Vegetarian</span><input type="checkbox" name="vegetarian" onChange={e => filterList(e, 'vegetarian')} />
                                <span>Vegan</span><input type="checkbox" name="vegan" onChange={e => filterList(e, 'vegan')} />
                                <span>Gluten Free</span><input type="checkbox" name="glutenFree" onChange={e => filterList(e, 'glutenFree')} />
                                <span>Ketogenic</span><input type="checkbox" name="Ketogenic" onChange={e => filterList(e, 'Ketogenic')} />
                                <span>Lacto Ovo Vegetarian</span><input type="checkbox" name="LactoVegetarian" onChange={e => filterList(e, 'LactoOvoVegetarian')} />
                                <span>Pescetarian</span><input type="checkbox" name="Pescetarian" onChange={e => filterList(e, 'Pescetarian')} />
                                <span>Paleo</span><input type="checkbox" name="Paleo" onChange={e => filterList(e, 'Paleo')} />
                                <span>Primal</span><input type="checkbox" name="Primal" onChange={e => filterList(e, 'Primal')} />
                                <span>Low FODMAP</span><input type="checkbox" name="LowFODMAP" onChange={e => filterList(e, 'LowFODMAP')} />
                                <span>Whole30</span><input type="checkbox" name="Whole30" onChange={e => filterList(e, 'Whole30')} />

                            </div>

                        </div>
                        <button onClick={sortListName}>Sort by name</button>
                        <button onClick={sortListHS}>Sort by Health Score</button>
                        <button onClick={changeStyle} className={ordStyle}>&gt;</button>
                        <div className={s.div_navBar}>
                            <button className={s.nav_button} onClick={pgPrev}>&lt;</button>
                            <span>{count}/{Math.ceil((rendered_recipes?.length / 9) - 1)}</span>
                            <button className={s.nav_button} onClick={pgNext}>&gt;</button>
                        </div>
                    </div>
                    {rendered_recipes?.slice(rcpIdx, (rcpIdx + 9)).map((r) =>
                        <li key={r.id} className={s.li}><img src={r.image} className={s.image} alt="recipePicture" /><Link to={`recipe/${r.id}/detail`} onClick={() => dispatch(toggleView(false))} className={s.link_component}>{r.title}</Link></li>
                    )}
                </ul>
            </div>
        </div>
    )
}