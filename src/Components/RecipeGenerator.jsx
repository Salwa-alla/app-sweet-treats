import React from "react";
import Button from "./Botton";

const RecipeGenerator = ({ onRecipeGenerated }) => {

  const recipes = [
    {
      name: "Tarte aux Fraises",
      category: "Tarte",
      description: "Une délicieuse tarte aux fraises fraîches avec une crème pâtissière légère."
    },
    {
      name: "Cupcake au Chocolat",
      category: "Cupcake",
      description: "Un cupcake moelleux au chocolat avec un glaçage crémeux."
    },
    {
      name: "Macaron à la Vanille",
      category: "Macaron",
      description: "Des macarons croquants à l'extérieur et moelleux à l'intérieur, parfumés à la vanille."
    },
    {
      name: "Éclair au Café",
      category: "Éclair",
      description: "Un éclair classique fourré de crème au café et nappé de fondant au chocolat."
    },
    {
      name: "Brownie aux Noix",
      category: "Brownie",
      description: "Un brownie riche et fondant parsemé de noix croquantes."
    }
  ];

  const generateRecipe = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    onRecipeGenerated(randomRecipe);
  };

  return (
    <div className="recipe-generator">
      <h3>Générer une Recette</h3>
      <p>Cliquez pour générer une recette aléatoire et pré-remplir le formulaire.</p>
      <Button type="button" onClick={generateRecipe} className="generate-btn">
        🍰 Générer une Recette
      </Button>
    </div>
  );
};

export default RecipeGenerator;
