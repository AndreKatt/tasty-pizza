export enum SortPropertyEnum {
  RAITING_DESC = "-raiting",
  RAITING_ASC = "raiting",
  PRICE_DESC = "-price",
  PRICE_ASC = "price",
  TITLE_DESC = "-title",
  TITLE_ASC = "title",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryID: number;
  currentPage: number;
  sort: Sort;
}
