import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PizzaSelector } from "../components/PizzaSelector";
import { CartItem } from "../redux/slices/cartSlice";

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<
    CartItem & {
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
    return <h2>Загрузка....</h2>;
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
      </div>
    </div>
  );
};
