import { describe, it, expect } from "vitest";
import reducer, { addSweetAsync } from "./sweetsSlice";

const initialState = {
  sweets: [],
  favorites: [],
  loading: false,
  error: null,
};

describe("sweetsSlice - ajout d'un dessert", () => {
  it("ajoute un dessert et le sauvegarde dans la liste", () => {
    const newSweet = {
      id: 1,
      name: "Tarte aux fraises",
      category: "Tarte",
      description: "Une tarte fraîche et gourmande",
      price: 4.5,
      image: "https://via.placeholder.com/300",
      isFavorite: false,
    };

    const nextState = reducer(initialState, {
      type: addSweetAsync.fulfilled.type,
      payload: newSweet,
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.sweets).toHaveLength(1);
    expect(nextState.sweets[0]).toEqual(newSweet);
  });

  it("conserve tous les desserts ajoutés", () => {
    const sweet1 = {
      id: 1,
      name: "Tarte aux fraises",
      category: "Tarte",
      description: "Une tarte fraîche et gourmande",
      price: 4.5,
      image: "https://via.placeholder.com/300",
      isFavorite: false,
    };

    const sweet2 = {
      id: 2,
      name: "Cupcake au chocolat",
      category: "Cupcake",
      description: "Un cupcake fondant au chocolat",
      price: 3.2,
      image: "https://via.placeholder.com/300",
      isFavorite: false,
    };

    const stateAfterFirst = reducer(initialState, {
      type: addSweetAsync.fulfilled.type,
      payload: sweet1,
    });

    const stateAfterSecond = reducer(stateAfterFirst, {
      type: addSweetAsync.fulfilled.type,
      payload: sweet2,
    });

    expect(stateAfterSecond.sweets).toHaveLength(2);
    expect(stateAfterSecond.sweets).toContainEqual(sweet1);
    expect(stateAfterSecond.sweets).toContainEqual(sweet2);
  });
});
