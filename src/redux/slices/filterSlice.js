import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryID(state, action) {
      state.categoryID = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryID, setSortType, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
