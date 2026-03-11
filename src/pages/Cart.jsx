import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../redux/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-emoji">🛒</div>
            <h1>Votre panier est vide</h1>
            <p>
              Ajoutez quelques desserts gourmands pour commencer votre
              commande.
            </p>
            <button
              className="cart-back-btn"
              onClick={() => navigate("/")}
            >
              Découvrir les desserts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Mon panier</h1>
            <p className="cart-subtitle">
              Récapitulatif de vos douceurs sucrées
            </p>
          </div>
          <div className="cart-header-badge">
            <span className="cart-header-emoji">🛒</span>
            <span className="cart-header-count">
              {items.length} {items.length > 1 ? "articles" : "article"}
            </span>
          </div>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <Link
                  to={`/sweet/${item.id}`}
                  className="cart-item-image-wrapper"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Link>

                <div className="cart-item-info">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">
                    {item.price.toFixed(2)}€ / unité
                  </p>

                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <span>
                    {(item.price * item.quantity).toFixed(2)}€
                  </span>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Résumé</h2>
            <div className="cart-summary-row">
              <span>Articles</span>
              <span>{items.length}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>

            <button
              type="button"
              className="cart-checkout-btn"
              onClick={() => {
                alert(
                  "Ceci est une démo : la commande n'est pas réellement envoyée."
                );
                dispatch(clearCart());
                navigate("/");
              }}
            >
              Valider la commande
            </button>

            <button
              type="button"
              className="cart-clear-btn"
              onClick={() => dispatch(clearCart())}
            >
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
