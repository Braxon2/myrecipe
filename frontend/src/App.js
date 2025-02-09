import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import RecipeForm from "./components/RecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/recipes"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/create" element={<RecipeForm />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
