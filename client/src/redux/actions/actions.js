require('dotenv').config();
export const GET_RECIPES = "GET_RECIPES";
export const GET_DETAIL = "GET_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const TOGGLE_VIEW = "TOGGLE_VIEW";

export function getRecipes(value) {
    return async function(dispatch) {
      return fetch(`${process.env.REACT_APP_HOST}/recipes?name=${value}`)
        .then(response => response.json())
        .then(response => {
          dispatch({ type: GET_RECIPES, payload: response});
        });
    };
  }

export function getDetail(id) {
    return async function(dispatch) {
      return fetch(`${process.env.REACT_APP_HOST}/recipes/${id}`)
        .then(response => response.json())
        .then(response => {
          dispatch({ type: GET_DETAIL, payload: response});
        });
    };
  }

  export function createRecipes(details) {
    return async function(dispatch) {
      return fetch(`${process.env.REACT_APP_HOST}/create`, {
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

