import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../../components/CartItem";
import { RootState } from "../store";

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem?.count) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price! * obj.count! + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem?.count && findItem.price) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item?.count && item?.price) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalPrice -= item.price * item.count;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
