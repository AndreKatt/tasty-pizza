import React from "react";
import { Link } from "react-router-dom";
import { PizzaSelector } from "../PizzaSelector";

export const PizzaBlock = ({ ...item }) => {
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
