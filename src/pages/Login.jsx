import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <div className="login-logo-icon">🍰</div>
          <h1 className="login-brand-title">SweetTreats</h1>
          <p className="login-brand-subtitle">Douceur à chaque bouchée</p>
        </div>

        <div className="login-right">
          <div className="login-hero-image login-hero-main"></div>

          <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleLogin} className="login-form">
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
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
              <div className="login-footer">
                <span>Vous n'avez pas de compte ?</span>
                <button
                  type="button"
                  className="login-register-link"
                  onClick={() => navigate("/register")}
                >
                  Créer un compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
