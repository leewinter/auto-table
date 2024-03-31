import { useMemo, useState, useEffect } from "react";
import { getDataType, searchObjectArray } from "@lib/utils";
import {
  getPageCount,
  getCurrentPageItems,
  getPageOffset,
} from "@lib/components/AutoTable/Pagination";
import TableHead from "@lib/components/AutoTable/TableHead";
import TableBody from "@lib/components/AutoTable/TableBody";
import TableFoot from "@lib/components/AutoTable/TableFoot";
import { useAutoTableStyles } from "@lib/components/AutoTable/useAutoTableStyles";
import TableSearch from "@lib/components/AutoTable/TableSearch";

export type TableContainerOptions = {
  pagination: {
    usePagination: boolean;
    itemsPerPage: number;
  };
  showSearch: boolean;
  humanReadableHeaders?: boolean;
};

export type TableContainerParams = {
  data: unknown;
  options: TableContainerOptions;
  tableIndex?: number;
};

const defaultProps = {
  data: null,
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

export const TableContainer: React.FC<TableContainerParams> = (props) => {
  const { data, tableIndex, options } = props;

  const [dataArray, setDataArray] = useState<Array<object>>([]);
  const [tableRows, setTableRows] = useState<Array<object>>([]);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [isPrimitiveArray, setIsPrimitiveArray] = useState<boolean>(false);
  const [isObjectTable, setIsObjectTable] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const { styles } = useAutoTableStyles();

  const dataType = useMemo(() => {
    return getDataType(data);
  }, [data]);

  const { usePagination, itemsPerPage, showSearch, humanReadableHeaders } =
    useMemo(() => {
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
    }, [options, dataType]);

  const columns = useMemo(() => {
    if (dataType) {
      let firsOrOnlyRow: object = {};
      if (dataType === "array") {
        const firstRow = (data as Array<unknown>)[0] ?? firsOrOnlyRow;
        if (getDataType(firstRow) === "object") {
          // is object array
          firsOrOnlyRow = firstRow;
        } else {
          // is primitive array
          setIsPrimitiveArray(true);
        }
      } else {
        // is object
        firsOrOnlyRow = data as object;
        setIsObjectTable(true);
      }
      return Object.keys(firsOrOnlyRow);
    }
    return [];
  }, [data, dataType]);

  const pageCount = useMemo(() => {
    return getPageCount(tableRows.length, itemsPerPage);
  }, [tableRows, itemsPerPage]);

  const currentItems = useMemo(() => {
    if (usePagination) {
      return getCurrentPageItems(tableRows, itemOffset, itemsPerPage);
    }
    return tableRows;
  }, [tableRows, itemOffset, itemsPerPage, usePagination]);

  useEffect(() => {
    if (data) {
      if (dataType === "array") setDataArray(data as Array<object>);
      if (dataType === "object") setDataArray([data]);
    }
  }, [data, dataType]);

  useEffect(() => {
    setTableRows(dataArray);
  }, [dataArray]);

  if (!dataArray.length)
    return (
      <div>
        <p>No data found</p>
      </div>
    );

  const handleRowClicked = (rowIndex: string) => {
    if (!isPrimitiveArray && !isObjectTable)
      setSelectedRow(rowIndex.toString());
  };

  const handlePageClick = (selected: number) => {
    const newOffset = getPageOffset(selected, itemsPerPage, tableRows.length);
    setItemOffset(newOffset);
  };

  const handleSearchChange = (query: string) => {
    const results = searchObjectArray(dataArray, columns, query);

    setItemOffset(0);
    setTableRows(results);
  };

  return (
    <>
      {showSearch ? <TableSearch onSearchChange={handleSearchChange} /> : null}
      <table css={styles}>
        <TableHead
          isNonKeyValueArray={isPrimitiveArray}
          humanReadableHeaders={humanReadableHeaders}
          columns={columns}
        />
        <TableBody
          isNonKeyValueArray={isPrimitiveArray}
          visibleRows={currentItems}
          tableIndex={tableIndex ?? defaultProps.tableIndex}
          onRowClicked={handleRowClicked}
          selectedRow={selectedRow}
          columns={columns}
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
};
