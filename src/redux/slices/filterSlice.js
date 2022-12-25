import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryID: 0,
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
  },
});

export const { setCategoryID, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
