import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";

import Home from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Загрузка...</div>,
});

// const Cart = React.lazy(
//   () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
// );
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
