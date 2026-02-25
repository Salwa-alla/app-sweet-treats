import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSweets, deleteSweetAsync } from "../redux/sweetsSlice";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { sweets, loading } = useSelector((state) => state.sweets);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Load sweets on mount
  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  // Handle delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      await dispatch(deleteSweetAsync(id));
    }
  };

  // If not authenticated, show message
  if (!isAuthenticated) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-not-authenticated">
            <h2>Accès restreint</h2>
            <p>Veuillez vous connecter pour accéder au dashboard administrateur.</p>
            <Link to="/login" className="login-link">Se connecter</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard Administrateur</h1>
          <p>Bienvenue, {user?.name}!</p>
        </div>

        <div className="dashboard-actions">
          <Link to="/add" className="add-new-btn">
            ➕ Ajouter un dessert
          </Link>
        </div>

        {loading && (
          <div className="loading">
            <p>Chargement...</p>
          </div>
        )}

        {!loading && sweets.length === 0 ? (
          <div className="no-sweets">
            <p>Aucun dessert trouvé.</p>
            <Link to="/add" className="add-first-btn">
              Ajouter votre premier dessert
            </Link>
          </div>
        ) : (
          <div className="dashboard-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sweets.map((sweet) => (
                  <tr key={sweet.id}>
                    <td>
                      <img 
                        src={sweet.image} 
                        alt={sweet.name} 
                        className="table-image"
                      />
                    </td>
                    <td>{sweet.name}</td>
                    <td>
                      <span className="category-badge">{sweet.category}</span>
                    </td>
                    <td>{sweet.price.toFixed(2)}€</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/sweet/${sweet.id}`} 
                          className="view-btn"
                          title="Voir"
                        >
                          👁️
                        </Link>
                        <Link 
                          to={`/edit/${sweet.id}`} 
                          className="edit-btn"
                          title="Modifier"
                        >
                          ✏️
                        </Link>
                        <button 
                          onClick={() => handleDelete(sweet.id, sweet.name)}
                          className="delete-btn"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total des desserts</h3>
            <p className="stat-number">{sweets.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
