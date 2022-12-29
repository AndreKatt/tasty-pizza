import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryID(state, action) {
      state.categoryID = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryID = Number(action.payload.categoryID);
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const selectSort = (state) => state.filter.sort;

export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const {
  setSearchValue,
  setCategoryID,
  setSortType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
