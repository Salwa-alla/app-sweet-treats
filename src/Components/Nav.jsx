import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "./Nav.css"; 

const Nav = () => { 
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Favoris", path: "/favorites" }
  ];

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍰</span>
          <span className="logo-text">
            <span className="logo-text-sweet">Sweet</span>
            <span className="logo-text-treats">Treats</span>
          </span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            {isAuthenticated ? (
              <div className="auth-buttons">
                <span className="user-name">{user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
              >
                Connexion
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
