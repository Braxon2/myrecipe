import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useRecipeContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const formatDate = (isoString) => {
    return format(new Date(isoString), "yyyy-MM-dd 'at' HH:mm");
  };

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view this recipe.");
      return;
    }

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [id, user]);

  return (
    <div className="recipe-detail">
      {error && <p>Error fetching...</p>}
      {recipe && (
        <div>
          <h3>{recipe?.title}</h3>
          <h4>Author: {recipe?.author}</h4>
          <p>Posted: {formatDate(recipe?.createdAt)}</p>
          <p>{recipe?.instruction}</p>
          {recipe?.ingredients?.map((ingredient, index) => (
            <ul>
              <li key={index}>{ingredient}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
