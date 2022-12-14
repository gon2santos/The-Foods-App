// Importa las actions types que necesites acá:
import {
  GET_RECIPES,
  GET_DETAIL,
  TOGGLE_VIEW,
  CREATE_RECIPE
} from "../actions/actions.js";

const initialState = {
  recipesLoaded: {},
  recipeDetail: {},
  createRecipe: false,
  showRecipes: false
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
    case TOGGLE_VIEW:
      return {
        ...state,
        showRecipes: action.payload
      }
    case CREATE_RECIPE:
      return {
        ...state,
        createRecipe: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;