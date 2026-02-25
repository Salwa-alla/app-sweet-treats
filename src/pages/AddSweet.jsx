import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSweetAsync } from "../redux/sweetsSlice";
import { useNavigate } from "react-router-dom";
import "./AddSweet.css"; 

const AddSweet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.sweets);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const generateDescription = () => {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();

    const baseLabel = trimmedName || "Ce dessert";
    const catLabel = trimmedCategory
      ? trimmedCategory.toLowerCase()
      : "gourmand";

    const variants = [
      `${baseLabel} est un dessert ${catLabel} aux saveurs équilibrées, parfait pour une pause sucrée.`,
      `${baseLabel} offre une texture fondante et un goût ${catLabel}, idéal pour partager avec vos proches.`,
      `${baseLabel} combine une texture délicate et des notes ${catLabel}, pour un moment de pure gourmandise.`,
      `${baseLabel} est pensé pour les amoureux de douceurs ${catLabel}, à savourer à tout moment de la journée.`,
    ];

    const randomIndex = Math.floor(Math.random() * variants.length);
    setDescription(variants[randomIndex]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newSweet = {
      name,
      category,
      description,
      price: parseFloat(price),
      image: image || "https://via.placeholder.com/300",
      userId: user?.id
    };
    
    await dispatch(addSweetAsync(newSweet));
    navigate("/dashboard");
  };

  return (
    <div className="add-sweet-page">
      <div className="container">
        <h1>Ajouter un dessert</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du dessert</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Tarte aux Fraises"
              required
            />
          </div>
          <div className="form-group">
            <label>Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Cupcake">Cupcake</option>
              <option value="Tarte">Tarte</option>
              <option value="Macaron">Macaron</option>
              <option value="Éclair">Éclair</option>
              <option value="Brownie">Brownie</option>
              <option value="Gâteau">Gâteau</option>
              <option value="Cookies">Cookies</option>
              <option value="Crème">Crème</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre dessert..."
              rows="4"
              required
            />
            <button
              type="button"
              className="ai-description-btn"
              onClick={generateDescription}
            >
              ✨ Générer une description
            </button>
          </div>
          <div className="form-group">
            <label>Prix (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 5.99"
              required
            />
          </div>
          <div className="form-group">
            <label>URL de l'image</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter le dessert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSweet;
