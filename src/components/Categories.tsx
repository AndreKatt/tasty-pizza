import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (idx: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
  value,
  onClickCategory,
}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(idx)}
            className={value === idx ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
