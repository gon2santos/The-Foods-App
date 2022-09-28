import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipes } from '../redux/actions/actions';
import s from './Create.module.css';

function Create() {
  const dispatch = useDispatch();

  const createResult = useSelector((state) => state.createRecipe);

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [hs, setHs] = useState(0);
  const [sbs, setSbs] = useState('');

  const [Vegetarian, setVegetarian] = useState(false);
  const [Vegan, setVegan] = useState(false);
  const [GlutenFree, setGlutenFree] = useState(false);
  const [DairyFree, setDairyFree] = useState(false);
  const [Ketogenic, setKetogenic] = useState(false);
  const [LactoOvoVegetarian, setLactoOvoVegetarian] = useState(false);
  const [Pescatarian, setPescatarian] = useState(false);
  const [Paleo, setPaleo] = useState(false);
  const [Primal, setPrimal] = useState(false);
  const [LowFODMAP, setLowFODMAP] = useState(false);
  const [Whole30, setWhole30] = useState(false);


  const [enableBtn, setEnableBtn] = useState(true);
  const [warningName, setWarningName] = useState('*');
  const [warningSummary, setWarningSummary] = useState('*');
  const [warningHS, setWarningHS] = useState('*');
  const [warningSbs, setWarningSbs] = useState('*');

  const [createdMsg, setCreatedMsg] = useState('');
  //const [warningForbiddenWords, setWarningForbiddenWords] = useState('');
  const [hidden, setHidden] = useState(s.hide);

  useEffect(() => {
    if(createResult?.created === true)
      setCreatedMsg('Recipe created successfully!');
    else if(createResult?.created === false)
      setCreatedMsg(`Failed to create recipe: ${createResult?.error}`);
    else
      setCreatedMsg('');
  }, [createResult]);

  function handleNameChange(e) {
    const regex = /^[\w- ]{4,}$/gm;
    if (regex.test(e.target.value)) {
      setName(e.target.value);
      setWarningName('');
    }
    else {
      setWarningName('Name has to be at least 4 characters long and cannot contain special characters.');
    }
  }
  function handleSummaryChange(e) {
    const regex = /^[\w-\.\, ]{50,}$/gm;
    if (regex.test(e.target.value)) {
      setSummary(e.target.value);
      setWarningSummary('');
    }
    else {
      setWarningSummary('Summary has to be at least 50 characters long and cannot contain special characters except dots and commas.');
    }
  }
  function handleHsChange(e) {
    if ((e.target.value < 0) || (e.target.value > 100)) {
      setWarningHS('Health Score cannot be less than 0 and more than 100');
    }
    else {
      setHs(e.target.value);
      setWarningHS('');
    }
  }
  function handleSbsChange(e) {
    //const regexWords = /^((?!script).){100,}$/gm;
    const regex = /^[\w\W]{100,}$/gm;
    if (!regex.test(e.target.value)) {
      setWarningSbs('Recipe steps has to be at least 100 characters long');
      setEnableBtn(true);
    }
    /* else if (!regexWords.test(e.target.value)) {
      setWarningForbiddenWords('Recipe steps cannot contain this words: "script"');
      setEnableBtn(true);
    } */
    else {
      setSbs(e.target.value);
      setWarningSbs('');
      //setWarningForbiddenWords('');
      if ((warningName + warningSbs + warningSummary /*+ warningForbiddenWords */) === '')
        setEnableBtn(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      name: name,
      summary: summary,
      hs: hs,
      sbs: sbs,
      vegetarian: Vegetarian,
      vegan: Vegan,
      glutenFree: GlutenFree,
      dairyFree: DairyFree,
      diets: ['keto']
    };

    let diets = [];

    diets.push(
      Vegan ? "vegan" : null,
      GlutenFree ? "gluten Free" : null,
      DairyFree ? "dairy Free" : null,
      Ketogenic ? "ketogenic" : null,
      LactoOvoVegetarian ? "lacto ovo vegetarian" : null,
      Pescatarian ? "pescatarian" : null,
      Paleo ? "paleolithic" : null,
      Primal ? "primal" : null,
      LowFODMAP ? "low FODMAP" : null,
      Whole30 ? "whole 30" : null
    );

    body.diets = diets.filter(n => n); //remove null values from diets array

    dispatch(createRecipes(body));
  };


  return (
    <div className={s.body}>
      <form className={s.form} onSubmit={e => { handleSubmit(e) }}>
        <div className={s.form_items}><span>Name: </span><span className={s.warning}>{warningName}</span><input type="text" name="name" onChange={handleNameChange} className={s.input} /></div>
        <div className={s.form_items}><span>Summary: </span><span className={s.warning}>{warningSummary}</span><input type="text" name="summary" onChange={handleSummaryChange} className={s.input} /></div>
        <div className={s.form_items}><span>Health Score: </span><span className={s.warning}>{warningHS}</span><input type="number" name="hs" onChange={handleHsChange} className={s.input} /></div>
        <div className={s.form_items}><span>Step by Step: </span><span className={s.warning}>{warningSbs}</span>{/* <span className={s.warning}>{warningForbiddenWords}</span> */}<textarea name="sbs" cols="40" rows="5" onChange={handleSbsChange} className={s.inputSbs}></textarea></div>

        <button type="button" className={s.buttonSetDiets} onClick={() => { hidden === s.hide ? setHidden(s.show) : setHidden(s.hide) }}>Set Diets</button>
        <div className={hidden}>
          <div className={s.div_ops}>
            <div className={s.column}>
              <div><input type="checkbox" name="vegetarian" value={Vegetarian} onChange={() => setVegetarian(!Vegetarian)} /><label htmlFor='vegetarian'>Vegetarian</label></div>
              <div><input type="checkbox" name="glutenFree" value={GlutenFree} onChange={() => setGlutenFree(!GlutenFree)} /><label htmlFor='glutenFree'>Gluten Free</label></div>
              <div><input type="checkbox" name="Ketogenic" value={Ketogenic} onChange={() => setKetogenic(!Ketogenic)} /><label htmlFor='Ketogenic'>Ketogenic</label></div>
              <div><input type="checkbox" name="Pescetarian" value={Pescatarian} onChange={() => setPescatarian(!Pescatarian)} /><label htmlFor='Pescetarian'>Pescetarian</label></div>
              <div><input type="checkbox" name="Primal" value={Primal} onChange={() => setPrimal(!Primal)} /><label htmlFor='Primal'>Primal</label></div>
              <div><input type="checkbox" name="Whole30" value={Whole30} onChange={() => setWhole30(!Whole30)} /><label htmlFor='Whole30'>Whole 30</label></div>
            </div>

            <div className={s.column}>
              <div><input type="checkbox" name="vegan" value={Vegan} onChange={() => setVegan(!Vegan)} /><label htmlFor='vegan'>Vegan</label></div>
              <div><input type="checkbox" name="dairyFree" value={DairyFree} onChange={() => setDairyFree(!DairyFree)} /><label htmlFor='dairyFree'>Dairy Free</label></div>
              <div><input type="checkbox" name="LactoOvoVegetarian" value={LactoOvoVegetarian} onChange={() => setLactoOvoVegetarian(!LactoOvoVegetarian)} /><label htmlFor='LactoOvoVegetarian'>Lacto-Ovo Vegetarian</label></div>
              <div><input type="checkbox" name="Paleo" value={Paleo} onChange={() => setPaleo(!Paleo)} /><label htmlFor='Paleo'>Paleo</label></div>
              <div><input type="checkbox" name="LowFODMAP" value={LowFODMAP} onChange={() => setLowFODMAP(!LowFODMAP)} /><label htmlFor='LowFODMAP'>Low FODMAP</label></div>
            </div>
          </div>
        </div>

        <input disabled={enableBtn} type="submit" value="Submit" className={s.button} />
        {/* <span>{createResult?.created ? 'SUCCESS!' : "FAILED!"}</span> */}
        <span>{createdMsg}</span>
      </form>
    </div>
  )
}

export default Create;
