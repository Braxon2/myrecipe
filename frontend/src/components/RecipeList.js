import { Link } from "react-router-dom";

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes &&
        recipes.map((recipe) => (
          <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
            <div className="recipe-preview">
              <h3>{recipe.title}</h3>
              <p>Written by: {recipe.author}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RecipeList;
