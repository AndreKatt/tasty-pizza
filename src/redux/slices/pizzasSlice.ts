import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  Record<string, string>
>("pizzas/fetchPizzasStatus", async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://63a5f5e4f8f3f6d4ab0406f0.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data;
});

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  count: number;
  types: string[];
  sizes: number[];
};

interface PizzasSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = [];
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
