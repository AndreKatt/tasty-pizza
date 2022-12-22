import logo from "./logo.svg";
import "./scss/app.scss";
import { Categories } from "./scss/components/Categories";

import { Header } from "./scss/components/Header";
import { PizzaBlock } from "./scss/components/PizzaBlock";
import { Sort } from "./scss/components/Sort";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Мексиканская" price={350} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
