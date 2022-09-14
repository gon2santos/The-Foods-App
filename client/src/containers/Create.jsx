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
  const [enableBtn, setEnableBtn] = useState(true);
  const [warningName, setWarningName] = useState('*');
  const [warningSummary, setWarningSummary] = useState('*');
  const [warningHS, setWarningHS] = useState('*');
  const [warningSbs, setWarningSbs] = useState('*');

  function handleNameChange(e) {
    const regex = /^[\w- ]{4,}$/gm;
    if(regex.test(e.target.value)){
      setName(e.target.value);
      setWarningName('');
    }
    else{
      setWarningName('Name has to be at least 4 characters long and cannot contain special characters.');
    }
  }
  function handleSummaryChange(e) {
    const regex = /^[\w-\.\, ]{50,}$/gm;
    if(regex.test(e.target.value)){
      setSummary(e.target.value);
      setWarningSummary('');
    }
    else{
      setWarningSummary('Name has to be at least 50 characters long and cannot contain special characters except dots and commas.');
    }
  }
  function handleHsChange(e) {
    if((e.target.value < 0) || (e.target.value > 100)){
      setWarningHS('Health Score cannot be less than 0 and more than 100');
    }
    else{
      setHs(e.target.value);
      setWarningHS('');
    }
  }
  function handleSbsChange(e) {
    const regex = /^((?!script).){100,}$/gm;
    if(regex.test(e.target.value)){
      setSbs(e.target.value);
      setWarningSbs('');
      if((warningName + warningHS + warningSbs + warningSummary) === '')
      setEnableBtn(false);
    }
    else{
      setWarningSbs('Steps has to be at least 100 characters long and cannot contain the word "script"');
      setEnableBtn(true);
    }
  }
  function handlevegetarianChange(e) {
    setVegetarian(!vegetarian);
  }
  function handleVeganChange(e) {
    setVegan(!vegan);
  }
  function handleglutenFreeChange(e) {
    setGlutenFree(!glutenFree);
  }
  function handledairyFreeChange(e) {
    setDairyFree(!dairyFree);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('cambiar esto por el POST');
  };



  return (
    <div className={s.body}>
      <form className={s.form} onSubmit={e => { handleSubmit(e) }}>
        <div className={s.form_items}><span>Name: </span><span className={s.warning}>{warningName}</span><input type="text" name="name"  onChange={handleNameChange} className={s.input} /></div>
        <div className={s.form_items}><span>Summary: </span><span className={s.warning}>{warningSummary}</span><input type="text" name="summary" onChange={handleSummaryChange} className={s.input} /></div>
        <div className={s.form_items}><span>Health Score: </span><span className={s.warning}>{warningHS}</span><input type="number" name="hs" onChange={handleHsChange} className={s.input} /></div>
        <div className={s.form_items}><span>Step by Step: </span><span className={s.warning}>{warningSbs}</span><textarea name="sbs" cols="40" rows="5" onChange={handleSbsChange} className={s.inputSbs}></textarea>{/* <input type="text" name="sbs" value={sbs} onChange={handleSbsChange} className={s.input}/> */}</div>
        <div className={s.div_ops}><div><span>Vegetarian</span><input type="checkbox" name="vegetarian" value={vegetarian} onChange={handlevegetarianChange} /></div>
          <div><span>Vegan</span><input type="checkbox" name="vegan" value={vegan} onChange={handleVeganChange} /></div></div>
        <div className={s.div_ops}><div><span>GlutenFree</span><input type="checkbox" name="glutenFree" value={glutenFree} onChange={handleglutenFreeChange} /></div>
          <div><span>DairyFree</span><input type="checkbox" name="dairyFree" value={dairyFree} onChange={handledairyFreeChange} /></div></div>
        <input disabled={enableBtn} type="submit" value="Submit" className={s.button} />
      </form>
    </div>
  )
}

export default Create;
