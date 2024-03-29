import ReactPaginate from "react-paginate";
import React from "react";
import { usePaginationStyles } from "@lib/components/AutoTable/Pagination/usePaginationStyles";

type PaginationParams = {
  onPageChange: (selectedPage: number) => void;
  pageCount: number;
  pageRangeDisplayed?: number;
};

export const Pagination: React.FC<
  PaginationParams & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { onPageChange, pageCount, pageRangeDisplayed = 5 } = props;
  const { styles } = usePaginationStyles();

  const handlePageClick = ({ selected }: { selected: number }): void => {
    onPageChange(selected);
  };

  return (
    <div css={styles}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export const getPageCount = (totalRowCount: number, pageSize: number) => {
  return Math.ceil(totalRowCount / pageSize);
};

export const getCurrentPageItems = (
  allRows: Array<unknown>,
  itemOffset: number,
  pageSize: number
) => {
  const endOffset = itemOffset + pageSize;
  return allRows.slice(itemOffset, endOffset);
};

export const getPageOffset = (
  selectedPage: number,
  pageSize: number,
  totalRowCount: number
) => {
  const newOffset = (selectedPage * pageSize) % totalRowCount;
  return newOffset;
};
