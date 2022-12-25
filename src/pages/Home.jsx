import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { SearchContext } from "../App";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import { setCategoryID, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryID, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryID(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryID > 0 ? `&category=${categoryID}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://63a5f5e4f8f3f6d4ab0406f0.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
