import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  const formatDate = (isoString) => {
    return format(new Date(isoString), "yyyy-MM-dd 'at' HH:mm");
  };

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
      <p>Posted: {formatDate(recipe.createdAt)}</p>
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
