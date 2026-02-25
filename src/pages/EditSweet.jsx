import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSweetAsync } from "../redux/sweetsSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSweet.css";

const EditSweet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sweets = useSelector((state) => state.sweets.sweets);
  const { loading } = useSelector((state) => state.sweets);
  const sweet = sweets.find((s) => s.id === parseInt(id));

  const [name, setName] = useState(sweet ? sweet.name : "");
  const [category, setCategory] = useState(sweet ? sweet.category : "");
  const [description, setDescription] = useState(sweet ? sweet.description : "");
  const [price, setPrice] = useState(sweet ? String(sweet.price) : "");
  const [image, setImage] = useState(sweet ? sweet.image : "");

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

  if (!sweet) {
    return (
      <div className="edit-sweet-page">
        <div className="container">
          <h1>Dessert non trouvé</h1>
          <p>Le dessert que vous souhaitez modifier n'existe pas.</p>
          <button onClick={() => navigate("/dashboard")}>Retour au dashboard</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      category,
      description,
      price: parseFloat(price),
      image: image || sweet.image,
      isFavorite: sweet.isFavorite,
      userId: sweet.userId
    };
    
    await dispatch(updateSweetAsync({ id: parseInt(id), updatedData }));
    navigate("/dashboard");
  };

  return (
    <div className="edit-sweet-page">
      <div className="container">
        <h1>Modifier le dessert</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du dessert</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type="submit" 
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSweet;
