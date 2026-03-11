import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSweets } from "../redux/sweetsSlice";
import Hero from "../Components/Hero";
import Card from "../Components/Card";
import SearchFilter from "../Components/SearchFilter";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { sweets, loading } = useSelector((state) => state.sweets);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const otherCategories = ["Cupcake", "Macaron", "Tarte", "Éclair", "Brownie"];

  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch =
      sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sweet.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" ||
      sweet.category === selectedCategory ||
      (selectedCategory === "Gâteau" &&
        !otherCategories.includes(sweet.category));

    return matchesSearch && matchesCategory;
  });

  const scrollToDesserts = () => {
    const section = document.getElementById("desserts-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMacaronChocolatClick = () => {
    scrollToDesserts();
  };

  return (
    <div className="home-page">
      <Hero
        onBadgeClick={() => {
          const section = document.getElementById("home-hero-discover");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      <section className="home-hero-section" id="home-hero-discover">
        <div className="home-hero-inner">
          <div className="home-hero-header">
            <h2 className="home-hero-title">
              Des douceurs à partager avec ceux que vous aimez
            </h2>
            <p className="home-hero-text">
              Cupcakes, gâteaux et cookies faits maison avec amour. Choisissez
              votre douceur préférée et partagez un moment sucré.
            </p>
          </div>

          <div className="home-hero-cards">
            <div className="hero-category-card">
              <div className="hero-category-image">
                <img src="/dessert2.jpeg" alt="Macarons bleus" />
              </div>
              <span className="hero-category-label">Macarons glacés</span>
            </div>

            <div
              className="hero-category-card"
              onClick={handleMacaronChocolatClick}
              style={{ cursor: "pointer" }}
            >
              <div className="hero-category-image">
                <img src="/dessert3.jpeg" alt="Macarons chocolat" />
              </div>
              <span className="hero-category-label">Macarons chocolat</span>
            </div>

            <div className="hero-category-card">
              <div className="hero-category-image">
                <img src="/dessert4.png" alt="Macarons myrtilles" />
              </div>
              <span className="hero-category-label">Macarons myrtilles</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container" id="desserts-section">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des desserts...</p>
          </div>
        )}

        {!loading && filteredSweets.length === 0 && (
          <div className="no-results">
            <p>Aucun dessert trouvé 😢</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
            >
              Réinitialiser
            </button>
          </div>
        )}

        {!loading && filteredSweets.length > 0 && (
          <div className="cards-grid">
            {filteredSweets.map((sweet) => (
              <Card key={sweet.id} sweet={sweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

