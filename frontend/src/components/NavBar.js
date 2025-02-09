import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="container">
      <Link to="/">
        <h2>MyRecipe</h2>
      </Link>
      <nav>
        {user && (
          <div>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/create">
              <li>Create New Recipe</li>
            </Link>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signup">
              <li>Signup</li>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
