import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRecipeContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeList = ({ recipes }) => {
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();

  if (!user) {
    return;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_RECIPE", payload: json });
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-list">
      {recipes &&
        recipes.map((recipe) => (
          <div className="recipe-preview" key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <h3>{recipe.title}</h3>
              <p>Written by: {recipe.nameUser}</p>
            </Link>
            <p>
              {formatDistanceToNow(new Date(recipe.createdAt), {
                addSuffix: true,
              })}
            </p>
            <button
              onClick={() => handleDelete(recipe._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
