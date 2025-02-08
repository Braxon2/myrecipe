import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedIngredients = ingredients.trim().split(",");

    const recipe = {
      title: title,
      author: author,
      instruction: instruction,
      ingredients: processedIngredients,
    };
    fetch(`/api/recipes/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }).then((res) => {
      console.log(ingredientsArray);

      setIsPending(false);
      navigate("/");
    });
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
    </div>
  );
};

export default RecipeForm;
