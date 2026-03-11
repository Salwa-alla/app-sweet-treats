import axios from "axios";
import products from "../data/products";

const API_BASE_URL = "https://6977da105b9c0aed1e8786b6.mockapi.io";
let mockUsers = [
  { id: 3, name: "Admin", email: "admin@gmail.com", password: "123admin" },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const normalizeSweet = (sweet) => ({
  ...sweet,
  id: typeof sweet.id === "string" ? Number(sweet.id) : sweet.id,
  price: typeof sweet.price === "string" ? parseFloat(sweet.price) : sweet.price,
  isFavorite: Boolean(sweet.isFavorite),
});
export const fetchSweets = () => {
  return axios
    .get(`${API_BASE_URL}/products`)
    .then((response) => {
      const data = response.data || [];
      if (Array.isArray(data) && data.length > 0) {
        console.log(
          "MockAPI fetchSweets: data from MockAPI.io, count =",
          data.length
        );
        return data.map(normalizeSweet);
      }
      console.log(
        "MockAPI fetchSweets: MockAPI returned empty list, using local products.js"
      );
      return products.map(normalizeSweet);
    })
    .catch((error) => {
      console.log(
        "MockAPI fetchSweets: error, using local products.js",
        error?.message || error
      );
      return products.map(normalizeSweet);
    });
};

export const fetchSweetsByUser = (userId) => {
  return axios
    .get(`${API_BASE_URL}/products`, {
      params: { userId },
    })
    .then((response) => response.data.map(normalizeSweet))
    .catch((error) => {
      throw new Error(error.response?.data?.message || error.message);
    });
};

export const addSweet = (sweetData) => {
  const payload = {
    ...sweetData,
    isFavorite: sweetData.isFavorite ?? false,
  };

  const mainRequest = axios
    .post(`${API_BASE_URL}/products`, payload)
    .then((response) => normalizeSweet(response.data));

  axios
    .post(
      "https://salwa.app.n8n.cloud/webhook/073762e9-0adc-4064-bc62-d396fd05af56",
      payload
    )
    .catch((error) => {
      console.log("n8n error:", error?.message || error);
    });

  return mainRequest;
};

export const updateSweet = (id, updatedData) => {
  return axios
    .put(`${API_BASE_URL}/products/${id}`, updatedData)
    .then((response) => normalizeSweet(response.data))
    .catch((error) => {
      console.log(
        "MockAPI updateSweet: error, updating locally only",
        error?.message || error
      );
      return normalizeSweet({ id, ...updatedData });
    });
};

export const deleteSweet = (id) => {
  return axios
    .delete(`${API_BASE_URL}/products/${id}`)
    .then(() => ({ success: true }))
    .catch((error) => {
      throw new Error(error.response?.data?.message || error.message);
    });
};

export const toggleFavorite = (id) => {
  return axios
    .get(`${API_BASE_URL}/products/${id}`)
    .then((current) => {
      const updated = {
        ...current.data,
        isFavorite: !current.data.isFavorite,
      };
      return axios.put(`${API_BASE_URL}/products/${id}`, updated);
    })
    .then((response) => normalizeSweet(response.data))
    .catch((error) => {
      throw new Error(error.response?.data?.message || error.message);
    });
};

export const login = (email, password) => {
  return delay(500).then(() => {
    const users = mockUsers;
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.email &&
        u.email.trim().toLowerCase() === normalizedEmail &&
        u.password === password
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("Email ou mot de passe incorrect");
  });
};

export const registerUser = (userData) => {
  return delay(800).then(() => {
    const users = mockUsers;

    const normalizedEmail = userData.email.trim().toLowerCase();
    if (
      users.find(
        (u) =>
          u.email &&
          u.email.trim().toLowerCase() === normalizedEmail
      )
    ) {
      throw new Error("Cet email est déjà utilisé");
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    users.push(newUser);
    mockUsers = users;

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  });
};

export const getUserById = (id) => {
  return delay(200).then(() => {
    const users = mockUsers;
    const user = users.find((u) => u.id === id);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("User not found");
  });
};

export default {
  fetchSweets,
  fetchSweetsByUser,
  addSweet,
  updateSweet,
  deleteSweet,
  toggleFavorite,
  login,
  registerUser,
  getUserById
};
