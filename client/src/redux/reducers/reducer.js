// Importa las actions types que necesites acá:
import {
    GET_RECIPES,
    GET_DETAIL,
  } from "../actions/actions.js";
  
  const initialState = {
    recipesLoaded: {},
    recipeDetail: {},
    recipeCreated: {}
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipesLoaded: action.payload
          }
        case GET_DETAIL:
          return {
            ...state,
            recipeDetail: action.payload
          }
        default:
          return state;
      }
  };
  
  export default rootReducer;