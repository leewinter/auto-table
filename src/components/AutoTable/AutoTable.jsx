import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { getDataType } from "../../utils";
import {
  getPageCount,
  getCurrentPageItems,
  getPageOffset,
} from "./Pagination.jsx";
import TableHead from "./TableHead.jsx";
import TableFoot from "./TableFoot.jsx";
import TableBody from "./TableBody.jsx";
import TableSearch from "./TableSearch.jsx";
import "./index.css";

const defaultProps = {
  data: null,
  tableClass: "styled-table",
  tableIndex: 0,
  options: {
    humanReadableHeaders: true,
    pagination: {
      usePagination: true,
      itemsPerPage: 10,
    },
    showSearch: false,
  },
};

export default function AutoTable({
  data,
  tableClass,
  tableIndex,
  options,
  ...props
}) {
  const [dataArray, setDataArray] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [isPrimitiveArray, setIsPrimitiveArray] = useState(false);
  const [isObjectTable, setIsObjectTable] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  const dataType = useMemo(() => {
    return getDataType(data);
  }, [data]);

  const {
    usePagination,
    itemsPerPage,
    showSearch = false,
    humanReadableHeaders,
  } = useMemo(() => {
    return {
      usePagination:
        (options?.pagination?.usePagination != null
          ? options?.pagination?.usePagination
          : defaultProps.options.pagination.usePagination) &&
        dataType === "array", // only allow pagination for arrays
      itemsPerPage:
        options?.pagination?.itemsPerPage != null
          ? options?.pagination?.itemsPerPage
          : defaultProps.options.pagination.itemsPerPage,
      showSearch:
        (options?.showSearch != null
          ? options?.showSearch
          : defaultProps.options.showSearch) && dataType === "array", // only allow search for arrays
      humanReadableHeaders:
        options?.humanReadableHeaders != null
          ? options?.humanReadableHeaders
          : defaultProps.options?.humanReadableHeaders,
    };
  }, [options, dataType, data]);

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
      if (dataType === "array") setDataArray(data);
      if (dataType === "object") setDataArray([data]);
    }
  }, [data, dataType]);

  useEffect(() => {
    setTableRows(dataArray);
  }, [dataArray]);

  const handleRowClicked = (rowIndex) => {
    if (!isPrimitiveArray && !isObjectTable) setSelectedRow(rowIndex);
  };

  if (!dataArray.length)
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

  const handleSearchChange = (query) => {
    const results = dataArray.filter((row) => {
      const matchedColumns = columns.filter((col) => {
        const propertyValue = row[col];
        if (!propertyValue) return false;
        if (
          propertyValue.toString().toLowerCase().includes(query.toLowerCase())
        )
          return true;
        return false;
      });
      let match = matchedColumns.length;
      if (!columns.length && !match)
        match = row.toString().toLowerCase().includes(query.toLowerCase());
      return match;
    });

    setItemOffset(0);
    setTableRows(results);
  };

  return (
    <>
      {showSearch ? <TableSearch onSearchChange={handleSearchChange} /> : null}
      <table {...props} className={tableClass}>
        <TableHead
          isNonKeyValueArray={isPrimitiveArray}
          humanReadableHeaders={humanReadableHeaders}
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
          options={options}
        />
        <TableFoot
          usePagination={usePagination}
          columns={columns}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </table>
    </>
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
    showSearch: PropTypes.bool,
  }),
};

AutoTable.defaultProps = defaultProps;
