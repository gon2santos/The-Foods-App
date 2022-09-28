import React from 'react';
import emptyList from '../images/emptyList.png';
import s from './component_styles/Empty.module.css';

export default function Empty() {
    return (
        <div className={s.body}>
            <img className={s.img_c} src={emptyList} alt="empty_list"/>
        </div>
    )
}



