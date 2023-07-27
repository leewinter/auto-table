import ReactPaginate from "react-paginate";

function Pagination({ onPageChange, pageCount, pageRangeDisplayed = 5 }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;

export const getPageCount = (totalRowCount, pageSize) => {
  return Math.ceil(totalRowCount / pageSize);
};

export const getCurrentPageItems = (allRows, itemOffset, pageSize) => {
  const endOffset = itemOffset + pageSize;
  return allRows.slice(itemOffset, endOffset);
};

export const getPageOffset = (selectedPage, pageSize, totalRowCount) => {
  const newOffset = (selectedPage * pageSize) % totalRowCount;
  return newOffset;
};
