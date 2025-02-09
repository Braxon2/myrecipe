import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useRecipeContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { recipe, dispatch } = useRecipeContext();

  const formatDate = (isoString) => {
    return format(new Date(isoString), "yyyy-MM-dd 'at' HH:mm");
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_RECIPE", payload: data });
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id, dispatch]);

  return (
    <div className="recipe-detail">
      <h3>{recipe?.title}</h3>
      <h4>Author: {recipe?.author}</h4>
      <p>Posted: {formatDate(recipe?.createdAt)}</p>
      <p>{recipe?.instruction}</p>
      {recipe?.ingredients?.map((ingredient) => (
        <ul>
          <li>{ingredient}</li>
        </ul>
      ))}
    </div>
  );
};

export default RecipeDetails;
