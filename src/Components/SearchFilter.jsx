import React from "react";
import { FiFilter } from "react-icons/fi";
import "./SearchFilter.css";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {

  const categories = [
    { name: "Tous", icon: "🍞" },
    { name: "Cupcake", icon: "🧁" },
    {
      name: "Macaron",
      icon: "🍪"
    },
    { name: "Gâteau", icon: "🎂" },
    { name: "Tarte", icon: "🍦" },
    { name: "Éclair", icon: "🍫" },
    { name: "Brownie", icon: "🍫" }
  ];

  return (
    <div className="search-filter">
      <div className="search-filter-header">
        <div className="filter-icon-wrapper">
          <FiFilter className="filter-icon" />
        </div>
        <div className="search-filter-text">
          <h3>Filtrer les desserts</h3>
          <p>Recherchez par nom et par catégorie</p>
        </div>
      </div>

      <div className="search-filter-controls">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Rechercher un dessert..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span className="emoji">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="emoji-image"
                />
              ) : (
                cat.icon
              )}
            </span>
            <span className="category-label">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
