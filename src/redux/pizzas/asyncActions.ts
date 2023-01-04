import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { PizzaItem } from "./types";

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
