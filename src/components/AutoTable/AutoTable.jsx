import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { getDataType } from "../../utils";
import { getPageCount, getCurrentPageItems, getPageOffset } from "./Pagination";
import TableHead from "./TableHead";
import TableFoot from "./TableFoot";
import TableBody from "./TableBody";
import "./index.css";

export default function AutoTable({
  data,
  tableClass,
  tableIndex,
  options,
  ...props
}) {
  const [tableRows, setTableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [isPrimitiveArray, setIsPrimitiveArray] = useState(false);
  const [isObjectTable, setIsObjectTable] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  const dataType = useMemo(() => {
    return getDataType(data);
  }, [data]);

  const { usePagination = false, itemsPerPage = 10 } = useMemo(() => {
    return {
      usePagination: options?.pagination?.usePagination && dataType === "array", // only allow pagination for arrays
      itemsPerPage: options?.pagination?.itemsPerPage,
    };
  }, [options]);

  const columns = useMemo(() => {
    if (dataType) {
      let firsOrOnlyRow = {};
      if (dataType === "array") {
        const firstRow = data[0] ?? firsOrOnlyRow;
        if (getDataType(firstRow) === "object") {
          // is object array
          firsOrOnlyRow = firstRow;
        } else {
          // is primitive array
          setIsPrimitiveArray(true);
        }
      } else {
        // is object
        firsOrOnlyRow = data;
        setIsObjectTable(true);
      }
      return Object.keys(firsOrOnlyRow);
    }
    return [];
  }, [data, dataType]);

  const pageCount = useMemo(() => {
    return getPageCount(tableRows.length, itemsPerPage);
  }, [tableRows]);

  const currentItems = useMemo(() => {
    if (usePagination) {
      return getCurrentPageItems(tableRows, itemOffset, itemsPerPage);
    }
    return tableRows;
  }, [tableRows, itemOffset]);

  useEffect(() => {
    if (data) {
      if (dataType === "array") setTableRows(data);
      if (dataType === "object") setTableRows([data]);
    }
  }, [data, dataType]);

  const handleRowClicked = (rowIndex) => {
    if (!isPrimitiveArray && !isObjectTable) setSelectedRow(rowIndex);
  };

  if (!tableRows.length)
    return (
      <div>
        <p>No data found</p>
      </div>
    );

  const handlePageClick = ({ selected: selectedPage }) => {
    const newOffset = getPageOffset(
      selectedPage,
      itemsPerPage,
      tableRows.length
    );
    setItemOffset(newOffset);
  };

  return (
    <table {...props} className={tableClass}>
      <TableHead
        isNonKeyValueArray={isPrimitiveArray}
        humanReadableHeaders={options.humanReadableHeaders}
        columns={columns}
      />
      <TableBody
        isNonKeyValueArray={isPrimitiveArray}
        visibleRows={currentItems}
        tableIndex={tableIndex}
        onRowClicked={handleRowClicked}
        selectedRow={selectedRow}
        columns={columns}
        tableClass={tableClass}
      />
      <TableFoot
        usePagination={usePagination}
        columns={columns}
        onPageChange={handlePageClick}
        pageCount={pageCount}
      />
    </table>
  );
}

AutoTable.propTypes = {
  /**
   * Data to display. Can be an array or object type
   */
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * Class applied to the table
   */
  tableClass: PropTypes.string,
  /**
   * settings object to override default behaviour
   */
  options: PropTypes.shape({
    humanReadableHeaders: PropTypes.bool,
    pagination: PropTypes.shape({
      usePagination: PropTypes.bool,
      itemsPerPage: PropTypes.number,
    }),
  }),
};

AutoTable.defaultProps = {
  data: null,
  tableClass: "styled-table",
  tableIndex: 0,
  options: {
    humanReadableHeaders: true,
    pagination: {
      usePagination: true,
      itemsPerPage: 10,
    },
  },
};
