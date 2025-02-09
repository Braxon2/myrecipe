import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeForm = () => {
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedIngredients = ingredients.trim().split(",");

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const recipe = {
      title: title,
      author: author,
      instruction: instruction,
      ingredients: processedIngredients,
    };
    try {
      const response = await fetch(`/api/recipes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(recipe),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to submit the recipe");
      }

      if (response.ok) {
        setError(null);
        navigate("/");
        dispatch({ type: "CREATE_RECIPE", payload: json });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Title of the recipe:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>Ingredients of the recipe:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Type the ingredients with comas (eg. cheese,ham,ketchup)"
        ></textarea>

        <label>Instruction of the recipe:</label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Type instruction"
          className="instruction"
        ></textarea>
        {!isPending && <button>Add recipe</button>}
        {isPending && <button>Adding New Recipe</button>}
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RecipeForm;
