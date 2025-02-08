import { Link } from "react-router-dom";

const RecipeList = ({ recipes, setRecipes }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the recipe");
      }

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
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
              <p>Written by: {recipe.author}</p>
            </Link>
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
