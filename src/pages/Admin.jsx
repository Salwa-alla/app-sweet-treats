import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="container">
        <h1>Administration</h1>
        <div className="admin-buttons">
          <Link to="/add" className="admin-btn add-btn">
            ➕ Ajouter un Dessert
          </Link>
          <Link to="/edit/1" className="admin-btn edit-btn">
            ✏️ Modifier un Dessert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
