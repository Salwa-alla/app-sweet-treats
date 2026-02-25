import React from "react";
import "./Hero.css";

const Hero = ({ onBadgeClick }) => {
  return (
    <section className="hero">
      <div
        className="hero-images"
        style={{
          backgroundImage: "url('/images/dessert.jpeg')",
        }}
      ></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span
          className="badge"
          onClick={onBadgeClick ? onBadgeClick : () => {}}
          style={{ cursor: "pointer" }}
        >
          ✨ Découvrez nos délices
        </span>

        <h1>
          Les plus beaux desserts <br /> faits avec amour
        </h1>

        <p>
          Explorez notre collection de pâtisseries artisanales, des cupcakes
          moelleux aux tartes dorées. Chaque création est une œuvre d'art.
        </p>
      </div>
    </section>
  );
};

export default Hero;
