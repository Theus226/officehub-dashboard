import React from "react";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./Dashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
