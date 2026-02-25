import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/sweetsSlice";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const { sweets } = useSelector((state) => state.sweets);

  // Get favorite sweets based on isFavorite property
  const favoriteSweets = sweets.filter((sweet) => sweet.isFavorite);

  const handleRemoveFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="fav-page">
      <div className="fav-container">
        <div className="fav-header">
          <h1>Mes Favoris</h1>
          <p>Voici vos desserts préférés</p>
        </div>

        {favoriteSweets.length > 0 ? (
          <div className="fav-grid">
            {favoriteSweets.map((sweet) => (
              <div key={sweet.id} className="fav-card">
                <Link to={`/sweet/${sweet.id}`} className="fav-card-link">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="fav-card-image"
                  />
                  <div className="fav-card-content">
                    <h3 className="fav-card-title">{sweet.name}</h3>
                    <p className="fav-card-price">{sweet.price.toFixed(2)}€</p>
                    <p className="fav-card-category">{sweet.category}</p>
                  </div>
                </Link>
                <button
                  className="fav-remove-btn"
                  onClick={() => handleRemoveFavorite(sweet.id)}
                >
                  Retirer des favoris
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="fav-no-favorites">
            <div className="fav-no-favorites-content">
              <div className="fav-no-favorites-emoji">🍰</div>
              <h2>Pas encore de favoris</h2>
              <p>Commencez à explorer nos délicieux desserts et ajoutez-les à vos favoris!</p>
              <Link to="/" className="fav-explore-btn">
                Explorer les desserts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
