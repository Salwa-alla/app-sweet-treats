import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchSweets as apiFetchSweets,
  addSweet as apiAddSweet,
  updateSweet as apiUpdateSweet,
  deleteSweet as apiDeleteSweet,
  toggleFavorite as apiToggleFavorite
} from "../api/sweets";

const initialState = {
  sweets: [],
  favorites: [],
  loading: false,
  error: null,
};

// Fetch all sweets
export const fetchSweets = createAsyncThunk(
  "sweets/fetchSweets",
  (_, { rejectWithValue }) =>
    apiFetchSweets().catch((error) => rejectWithValue(error.message))
);

// Add new sweet
export const addSweetAsync = createAsyncThunk(
  "sweets/addSweet",
  (sweetData, { rejectWithValue }) =>
    apiAddSweet(sweetData).catch((error) => rejectWithValue(error.message))
);

// Update sweet
export const updateSweetAsync = createAsyncThunk(
  "sweets/updateSweet",
  ({ id, updatedData }, { rejectWithValue }) =>
    apiUpdateSweet(id, updatedData).catch((error) =>
      rejectWithValue(error.message)
    )
);

export const deleteSweetAsync = createAsyncThunk(
  "sweets/deleteSweet",
  (id) =>
    apiDeleteSweet(id)
      .catch((error) => {
        console.log(
          "deleteSweetAsync: API error, deleting locally only",
          error?.message || error
        );
      })
      .then(() => id)
);

// Toggle favorite
export const toggleFavoriteAsync = createAsyncThunk(
  "sweets/toggleFavorite",
  (id, { rejectWithValue }) =>
    apiToggleFavorite(id)
      .then((updatedSweet) => ({ id, isFavorite: updatedSweet.isFavorite }))
      .catch((error) => rejectWithValue(error.message))
);

const sweetsSlice = createSlice({
  name: "sweets",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const sweetIndex = state.sweets.findIndex(s => s.id === id);
      if (sweetIndex !== -1) {
        state.sweets[sweetIndex].isFavorite = !state.sweets[sweetIndex].isFavorite;
      }
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    // Fetch Sweets
    builder.addCase(fetchSweets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSweets.fulfilled, (state, action) => {
      state.loading = false;
      state.sweets = action.payload;
    });
    builder.addCase(fetchSweets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Sweet
    builder.addCase(addSweetAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addSweetAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.sweets.push(action.payload);
    });
    builder.addCase(addSweetAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Sweet
    builder.addCase(updateSweetAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSweetAsync.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.sweets.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sweets[index] = action.payload;
      }
    });
    builder.addCase(updateSweetAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSweetAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSweetAsync.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.sweets = state.sweets.filter(s => s.id !== id);
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
      }
    });

    // Toggle Favorite
    builder.addCase(toggleFavoriteAsync.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
      const { id, isFavorite } = action.payload;
      // Update the sweets array with the new isFavorite value
      const sweetIndex = state.sweets.findIndex(s => s.id === id);
      if (sweetIndex !== -1) {
        state.sweets[sweetIndex].isFavorite = isFavorite;
      }
      // Update local favorites array
      if (isFavorite) {
        if (!state.favorites.includes(id)) {
          state.favorites.push(id);
        }
      } else {
        state.favorites = state.favorites.filter(f => f !== id);
      }
    });
    builder.addCase(toggleFavoriteAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { toggleFavorite, clearError } = sweetsSlice.actions;
export default sweetsSlice.reducer;
