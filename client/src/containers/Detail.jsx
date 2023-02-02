import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail } from '../redux/actions/actions';
import s from './Detail.module.css';

function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const info = useSelector((state) => state.recipeDetail);

  return (
    <div className={s.body}>
      <div className={s.recipe_cont}>
        <div className={s.recipe_head}><span className={s.recipe_title}>{info.title}</span><img src={info.image} className={s.image} alt="recipe_img" /></div>
        <div className={s.dishTypes}>Dish types: {info?.dishTypes?.map(d => <span>&#8226;{d}&#160;&#160;</span>)}</div>
        {info?.diets?.length ? <div className={s.dietsTypes}>Diet types: {info?.diets?.map(d => <span>&#8226;{d}&#160;&#160;</span>)}</div> : <div></div>}
        {<span className={s.dishTypes}>Health Score: {info.healthScore}</span>}
        <div className={s.recipeSummary} dangerouslySetInnerHTML={{
          __html: info.summary
        }} />
        <span className={s.instr}>Instructions: </span>
        <div className={s.recipeSteps} dangerouslySetInnerHTML={{
          __html: info.instructions
        }}/>
        {/* <div>{<span className={s.dishTypes}>Tiempo de coccion: {info.tdc}</span>}</div> */}
      </div>
    </div>
  );
}

export default Detail;
