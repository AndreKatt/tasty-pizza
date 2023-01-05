import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { PizzaSelector, CartItemType } from "../components";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<
    CartItemType & {
      types: string[];
      sizes: number[];
    }
  >();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63a5f5e4f8f3f6d4ab0406f0.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (e) {
        alert("Не удалось загрузить информацию о пицце");
        nav("/");
      }
    }

    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <>Загрузка....</>;
  }

  return (
    <div className="pizza">
      <div className="pizza__img">
        <img src={pizza.imageUrl} alt="" />
      </div>
      <div className="pizza__description">
        <h2>{pizza.title}</h2>
        <p>{pizza.description}</p>
        <div className="pizza__description_selector">
          <PizzaSelector {...pizza} />
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
