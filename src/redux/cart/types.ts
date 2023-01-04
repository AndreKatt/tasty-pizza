import { CartItemType } from "../../components/CartItem";

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
