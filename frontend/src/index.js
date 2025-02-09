import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { RecipeContextProvider } from "./context/RecipeContextt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
