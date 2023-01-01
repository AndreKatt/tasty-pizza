import React from "react";
import { Link } from "react-router-dom";
import { CartItemType } from "../CartItem";
import { PizzaSelector } from "../PizzaSelector";

export const PizzaBlock: React.FC<
  CartItemType & {
    types: string[];
    sizes: number[];
  }
> = ({ ...item }) => {
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${item.id}`}>
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{item.title}</h4>
        </Link>
        <PizzaSelector {...item} />
      </div>
    </div>
  );
};
