import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Skeleton from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Pagination } from "../components/Pagination/Pagination";
import {
  selectFilter,
  setCategoryID,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryID, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryID(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        currentPage: String(currentPage),
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
      fetchPizzas({});
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      fetchPizzas({});
    }
    // eslint-disable-next-line
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line
  }, [categoryID, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
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
