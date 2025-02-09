import { createContext, useReducer } from "react";

export const RecipeContext = createContext();

export const recipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPE":
      return {
        recipe: action.payload,
      };
    case "CREATE_RECIPE":
      return {
        recipe: [action.payload, ...state.recipe],
      };
    case "DELETE_RECIPE":
      return {
        recipe: state.recipe.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, {
    recipe: [],
  });

  return (
    <RecipeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
