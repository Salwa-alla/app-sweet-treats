import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUserAsync } from "../redux/authSlice";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setLocalError("Tous les champs sont obligatoires.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas.");
      return;
    }

    const resultAction = await dispatch(
      registerUserAsync({ name: name.trim(), email: email.trim(), password })
    );

    if (registerUserAsync.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <div className="register-logo-icon">🍰</div>
          <h1 className="register-brand-title">SweetTreats</h1>
          <p className="register-brand-subtitle">
            Créez votre compte et commencez à gérer vos desserts.
          </p>
        </div>

        <div className="register-right">
          <div className="register-container">
            <h2>Créer un compte</h2>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choisissez un mot de passe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répétez le mot de passe"
                  required
                />
              </div>

              {(localError || error) && (
                <div className="error-message">
                  {localError || error}
                </div>
              )}

              <button
                type="submit"
                className="register-btn"
                disabled={loading}
              >
                {loading ? "Création du compte..." : "Créer un compte"}
              </button>

              <div className="register-footer">
                <span>Vous avez déjà un compte ?</span>
                <Link to="/login" className="register-link">
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
