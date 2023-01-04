export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  count: number;
  types: string[];
  sizes: number[];
};

export interface PizzasSliceState {
  items: PizzaItem[];
  status: Status;
}
