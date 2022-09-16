require('dotenv').config();
export const GET_RECIPES = "GET_RECIPES";
export const GET_DETAIL = "GET_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const TOGGLE_VIEW = "TOGGLE_VIEW";

export function getRecipes(value) {
    return async function(dispatch) {
      return fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=100&apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)//reemplazar por llamado al server, meter esto en la api
        .then(response => response.json())
        .then(response => {
          dispatch({ type: GET_RECIPES, payload: response});
        });
    };
  }

export function getDetail(id) {
    return async function(dispatch) {
      return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)//reemplazar por llamado al server, meter esto en la api
        .then(response => response.json())
        .then(response => {
          dispatch({ type: GET_DETAIL, payload: response});
        });
    };
  }

  export function createRecipes(details) {
    return async function(dispatch) {
      return fetch('http://localhost:3001/create', {
        method: 'post',
        body: JSON.stringify(details),
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(response => {
          dispatch({ type: CREATE_RECIPE, payload: response});
        });
    };
  }

  export function toggleView(value) {
    return function(dispatch) {
      return dispatch({ type: TOGGLE_VIEW, payload: value});
    };
  }

