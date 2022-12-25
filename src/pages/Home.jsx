import React, { useState, useEffect } from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryID, setCategoryID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "raiting",
  });

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryID > 0 ? `category=${categoryID}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://63a5f5e4f8f3f6d4ab0406f0.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryID, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryID}
          onClickCategory={(id) => setCategoryID(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
