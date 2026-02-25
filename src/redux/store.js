import { configureStore } from "@reduxjs/toolkit";
import sweetsReducer from "./sweetsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    sweets: sweetsReducer,
    auth: authReducer,
  },
});

export default store;
