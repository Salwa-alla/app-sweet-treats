import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

// Gestion d'erreurs globale pour capturer les erreurs non gérées
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Erreur globale:", { message, source, lineno, colno, error });
  return false;
};

window.onunhandledrejection = (event) => {
  console.error("Promise non gérée:", event.reason);
};

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
