import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite, deleteSweetAsync } from "../redux/sweetsSlice";
import "./Card.css";

const Card = ({ sweet }) => {
  const dispatch = useDispatch();
  const isFavorite = sweet.isFavorite;

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${sweet.name} ?`)) {
      dispatch(deleteSweetAsync(sweet.id));
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleFavorite(sweet.id));
  };

  return (
    <div className="card">
      <Link to={`/sweet/${sweet.id}`} className="card-link">
        <div className="card-image">
          <img src={sweet.image} alt={sweet.name} />
        </div>

        <div className="card-content">
          <h3 className="card-title">{sweet.name}</h3>
          <p className="card-price">{sweet.price.toFixed(2)}€</p>
          <p className="card-category">{sweet.category}</p>
        </div>
      </Link>

      <div className="card-actions">
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Card;
