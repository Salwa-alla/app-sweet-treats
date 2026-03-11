import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSweetAsync } from "../redux/sweetsSlice";
import { addToCart } from "../redux/cartSlice";
import "./Card.css";

const Card = ({ sweet }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${sweet.name} ?`)) {
      dispatch(deleteSweetAsync(sweet.id));
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(sweet));
  };

  return (
    <div className="card">
      <Link to={`/sweet/${sweet.id}`} className="card-link">
        <div className="card-image">
          <img src={sweet.image} alt={sweet.name} />
        </div>

        <div className="card-content">
          <h3 className="card-title">{sweet.name}</h3>
          <div className="card-meta">
            <p className="card-price">{sweet.price.toFixed(2)}€</p>
            <p className="card-category">{sweet.category}</p>
          </div>
        </div>
      </Link>

      <div className="card-actions">
        <button className="delete-btn" onClick={handleDelete}>
          🗑️
        </button>

        <button className="cart-btn" onClick={handleAddToCart}>
          🛒
        </button>
      </div>
    </div>
  );
};

export default Card;
