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

  return (
    <div className="home-page">
      <Hero
        onBadgeClick={() => {
          const section = document.getElementById("desserts-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

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

