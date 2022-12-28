import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://63a5f5e4f8f3f6d4ab0406f0.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = [];
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
