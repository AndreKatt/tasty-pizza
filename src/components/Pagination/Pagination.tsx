import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
    previousLabel="<"
  />
);
