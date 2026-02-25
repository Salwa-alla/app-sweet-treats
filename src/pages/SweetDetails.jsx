import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, deleteSweetAsync } from "../redux/sweetsSlice";
import "./SweetDetails.css";

const SweetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sweets = useSelector((state) => state.sweets.sweets);
  const sweet = sweets.find((s) => s.id === parseInt(id));
  const isFavorite = sweet?.isFavorite || false;

  if (!sweet) {
    return (
      <div className="sweet-details-page">
        <div className="container">
          <h1>Dessert non trouvé</h1>
          <p>Le dessert que vous cherchez n'existe pas.</p>
          <Link to="/" className="back-link">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // Sample ingredients based on sweet name (can be expanded)
  const getIngredients = (name) => {
    const ingredientsMap = {
      "Cupcake Chocolat": ["Farine", "Sucre", "Beurre", "Chocolat noir", "Oeufs", "Lait"],
      "Tarte aux Fraises": ["Pâte sablée", "Crème pâtissière", "Fraises", "Sucre glace"],
      "Macaron Vanille": ["Poudre d'amandes", "Sucre glace", "Blancs d'oeufs", "Sucre", "Vanille"],
      "Éclair au Café": ["Pâte à choux", "Crème au café", "Fondant au chocolat", "Café"],
      "Brownie Chocolat": ["Chocolat noir", "Beurre", "Sucre", "Oeufs", "Farine", "Noix"]
    };
    return ingredientsMap[name] || ["Ingrédients non spécifiés"];
  };

  const ingredients = getIngredients(sweet.name);

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${sweet.name} ?`)) {
      await dispatch(deleteSweetAsync(sweet.id));
      navigate("/dashboard");
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(sweet.id));
  };

  return (
    <div className="sweet-details-page">
      <div className="container">
        <div className="sweet-details">
          <div className="sweet-image">
            <img src={sweet.image} alt={sweet.name} />
            <button 
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="sweet-info">
            <h1>{sweet.name}</h1>
            <p className="sweet-category">{sweet.category}</p>
            <p className="sweet-price">{sweet.price.toFixed(2)}€</p>
            <p className="sweet-description">{sweet.description}</p>

            <div className="sweet-ingredients">
              <h3>Ingrédients :</h3>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="sweet-actions">
              <Link to={`/edit/${sweet.id}`} className="edit-link">
                ✏️ Modifier
              </Link>
              <button onClick={handleDelete} className="delete-btn">
                🗑️ Supprimer
              </button>
            </div>

            <Link to="/" className="back-link">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetDetails;
