import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import s from './Create.module.css';

function Create() {
  //const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [hs, setHs] = useState(0);
  const [sbs, setSbs] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSummaryChange(e) {
    setSummary(e.target.value);
  }
  function handleHsChange(e) {
    setHs(e.target.value);
  }
  function handleSbsChange(e) {
    setSbs(e.target.value);
  }
  function handlevegetarianChange(e){
    setVegetarian(!vegetarian);
  }
  function handleVeganChange(e){
    setVegan(!vegan);
  }
  function handleglutenFreeChange(e){
    setGlutenFree(!glutenFree);
  }
  function handledairyFreeChange(e){
    setDairyFree(!dairyFree);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('cambiar esto por el POST');
};

  return (
    <div className={s.body}>
      <form className={s.form} onSubmit={e => { handleSubmit(e) }}>
        <div className={s.form_items}><span>Name: </span><input type="text" name="name" value={name} onChange={handleNameChange} className={s.input}/></div>
        <div className={s.form_items}><span>Summary: </span><input type="text" name="summary" value={summary} onChange={handleSummaryChange} className={s.input}/></div>
        <div className={s.form_items}><span>Health Score: </span><input type="number" name="hs" value={hs} onChange={handleHsChange} className={s.input}/></div>
        <div className={s.form_items}><span>Step by Step: </span><textarea name="sbs" cols="40" rows="5" value={sbs} onChange={handleSbsChange} className={s.inputSbs}></textarea>{/* <input type="text" name="sbs" value={sbs} onChange={handleSbsChange} className={s.input}/> */}</div>
        <div className={s.div_ops}><div><span>Vegetarian</span><input type="checkbox" name="vegetarian" value={vegetarian} onChange={handlevegetarianChange} /></div>
        <div><span>Vegan</span><input type="checkbox" name="vegan" value={vegan} onChange={handleVeganChange} /></div></div>
        <div className={s.div_ops}><div><span>GlutenFree</span><input type="checkbox" name="glutenFree" value={glutenFree} onChange={handleglutenFreeChange} /></div>
        <div><span>DairyFree</span><input type="checkbox" name="dairyFree" value={dairyFree} onChange={handledairyFreeChange} /></div></div>
        <input type="submit" value="Submit" className={s.listItem}/>
      </form>
    </div>
  )
}

export default Create;
