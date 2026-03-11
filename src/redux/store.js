import { configureStore } from "@reduxjs/toolkit";
import sweetsReducer from "./sweetsSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    sweets: sweetsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
