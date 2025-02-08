import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-detail">
      <h3>{recipe.title}</h3>
      <h4>Author: {recipe.author}</h4>
      <p>{recipe.instruction}</p>
      {recipe.ingredients.map((ingredient) => (
        <ul>
          <li>{ingredient}</li>
        </ul>
      ))}
    </div>
  );
};

export default RecipeDetails;
