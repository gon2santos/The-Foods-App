import React, { useEffect } from 'react';
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail } from '../redux/actions/actions';
import s from './Detail.module.css';

function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => { dispatch(getDetail(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const info = useSelector((state) => state.recipeDetail);

  return (
    <div className={s.body}>
      <div className={s.recipe_cont}>
        <div className={s.recipe_head}><span className={s.recipe_title}>{info.title}</span><img src={info.image} className={s.image} alt="recipe_img"/></div>
        {/* the dangerouslySetInnerHTML prop opens app to XSS attacks, so I'm using DOMPurify to only allow safe html tags*/}
        <div dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(info.summary, {
            ALLOWED_TAGS: ["p", "span", "b", "a"]
          })
        }} />
      </div>
    </div>
  );
}

export default Detail;
