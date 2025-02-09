import { useAuthContext } from "./useAuthContext";
import { useRecipeContext } from "./useRecipesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: recipeDispatch } = useRecipeContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    recipeDispatch({ type: "SET_RECIPE", payload: null });
  };

  return { logout };
};
