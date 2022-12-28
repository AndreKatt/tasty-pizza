import React, { useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { SearchContext } from "../App";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import { setCategoryID, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryID, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryID(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryID > 0 ? `&category=${categoryID}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметр и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        categoryID,
        sortProperty: sort.sortProperty,
        currentPage,
      });
      nav(`?${queryStr}`);
    }

    if (!window.location.search) {
      fetchPizzas();
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      fetchPizzas();
    }
    // eslint-disable-next-line
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
