import React, { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const changeActive = (idx) => {
    return setActiveIndex(idx);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={item}
            onClick={() => changeActive(idx)}
            className={activeIndex === idx ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
