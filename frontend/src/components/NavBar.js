import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h2>MyRecipe</h2>
      </Link>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/create">
          <li>Create New Recipe</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
