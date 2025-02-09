import { useEffect } from "react";
import RecipeList from "./RecipeList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipeContext } from "../hooks/useRecipesContext";

const Home = () => {
  const { recipe, dispatch } = useRecipeContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RECIPE", payload: json });
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [dispatch, user]);

  return (
    <div className="recipe-list">
      <h2>All recepies</h2>

      {recipe && <RecipeList recipes={recipe} />}
    </div>
  );
};

export default Home;
