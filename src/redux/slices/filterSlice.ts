import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RAITING_DESC = "-raiting",
  RAITING_ASC = "raiting",
  PRICE_DESC = "-price",
  PRICE_ASC = "price",
  TITLE_DESC = "-title",
  TITLE_ASC = "title",
}

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
  searchValue: string;
  categoryID: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryID: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RAITING_DESC,
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
    setFilters(state, action: PayloadAction<FilterSliceState>) {
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
