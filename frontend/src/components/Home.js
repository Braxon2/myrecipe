import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
const Home = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    try {
      fetch("/api/recipes")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRecipes(data);
        });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  return (
    <div className="recipe-list">
      <h2>All recepies</h2>

      {recipes ? (
        <RecipeList recipes={recipes} setRecipes={setRecipes} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
