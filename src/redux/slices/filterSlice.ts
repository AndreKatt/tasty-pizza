import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty:
    | "raiting"
    | "price"
    | "title"
    | "-raiting"
    | "-price"
    | "-title";
};

interface FilterState {
  searchValue: string;
  categoryID: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterState = {
  searchValue: "",
  categoryID: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "raiting",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryID(state, action: PayloadAction<number>) {
      state.categoryID = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryID = Number(action.payload.categoryID);
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const selectSort = (state: RootState) => state.filter.sort;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const {
  setSearchValue,
  setCategoryID,
  setSortType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
