import React from "react";
import { FaWhatsapp, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🍰</div>
          <div className="footer-text">
            <h3>SweetTreats</h3>
            <p>Des desserts faits avec amour pour chaque occasion.</p>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Navigation</h4>
            <a href="/">Accueil</a>
            <a href="/favorites">Favoris</a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="footer-column">
            <h4>Liens rapides</h4>
            <a href="/add">Ajouter un dessert</a>
            <a href="/login">Connexion</a>
            <a href="/#recettes">Recettes</a>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <span>Commandes personnalisées</span>
            <span>Anniversaires</span>
            <span>Événements spéciaux</span>
          </div>
        </div>
      </div>

      <div className="footer-info-row">
        <div className="footer-info-item">
          <FiMapPin />
          <span>Casablanca, Maroc</span>
        </div>
        <div className="footer-info-item">
          <FiPhone />
          <span>(+212) 6 00 00 00 00</span>
        </div>
        <div className="footer-info-item">
          <FiMail />
          <span>contact@sweet-treats.com</span>
        </div>
        <div className="footer-social">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noreferrer"
            className="social-icon whatsapp"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon instagram"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon twitter"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon facebook"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} SweetTreats. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;


