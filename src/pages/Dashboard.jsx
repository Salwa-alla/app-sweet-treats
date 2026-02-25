import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSweets, deleteSweetAsync } from "../redux/sweetsSlice";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { sweets, loading } = useSelector((state) => state.sweets);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const totalSweets = sweets.length;
  const totalFavorites = sweets.filter((s) => s.isFavorite).length;
  const categoriesCount = new Set(sweets.map((s) => s.category)).size;
  const averagePrice = sweets.length
    ? (sweets.reduce((sum, s) => sum + s.price, 0) / sweets.length).toFixed(2)
    : "0.00";

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      await dispatch(deleteSweetAsync(id));
    }
  };

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
        <div className="dashboard-layout">
          <main className="dashboard-main">
            <div className="dashboard-header">
              <div className="dashboard-header-text">
                <h1>Tableau de Bord Administrateur</h1>
                <p>Bienvenue, {user?.name || "Admin"} !</p>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Total des desserts</h3>
                <div className="stat-number-wrapper">
                  <span className="stat-number">{totalSweets}</span>
                </div>
                <p className="stat-label">Desserts enregistrés</p>
              </div>
              <div className="stat-card">
                <h3>Favoris</h3>
                <div className="stat-number-wrapper">
                  <span className="stat-number">{totalFavorites}</span>
                </div>
                <p className="stat-label">Desserts en favoris</p>
              </div>
              <div className="stat-card">
                <h3>Catégories</h3>
                <div className="stat-number-wrapper">
                  <span className="stat-number">{categoriesCount}</span>
                </div>
                <p className="stat-label">Types de desserts</p>
              </div>
              <div className="stat-card">
                <h3>Prix moyen</h3>
                <div className="stat-number-wrapper">
                  <span className="stat-number">{averagePrice}€</span>
                </div>
                <p className="stat-label">Par dessert</p>
              </div>
            </div>

            {loading && (
              <div className="loading">
                <p>Chargement...</p>
              </div>
            )}

            {!loading && (
              <div className="dashboard-main-actions">
                <Link to="/add" className="main-action-btn primary">
                  + Ajouter
                </Link>
                <a href="#dashboard-table" className="main-action-btn ghost">
                  ✏️ Modifier
                </a>
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
              <>
                <div className="dashboard-bottom-bar">
                  <div className="bottom-user">
                    <div className="bottom-user-avatar">
                      <span>
                        {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                      </span>
                    </div>
                    <div className="bottom-user-info">
                      <div className="bottom-user-name">
                        {user?.name || "Admin"}
                      </div>
                      <div className="bottom-user-email">
                        {user?.email || "admin@gmail.com"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dashboard-section-header">
                  <div>
                    <h2>Liste des Desserts</h2>
                    <p>Gérez vos desserts, leurs prix et catégories</p>
                  </div>
                  <a href="#dashboard-table" className="see-all-link">
                    Voir tout
                  </a>
                </div>
                <div className="dashboard-table" id="dashboard-table">
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
                                <span className="action-icon">👁️</span>
                              </Link>
                              <Link 
                                to={`/edit/${sweet.id}`} 
                                className="edit-btn"
                                title="Modifier"
                              >
                                <span className="action-icon">✏️</span>
                              </Link>
                              <button 
                                onClick={() => handleDelete(sweet.id, sweet.name)}
                                className="delete-btn"
                                title="Supprimer"
                              >
                                <span className="action-icon">🗑️</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
