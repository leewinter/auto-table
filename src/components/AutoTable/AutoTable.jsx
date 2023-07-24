import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { getDataType, getHumanReadable } from "../../utils";
import RenderPrimitive from "../RenderPrimitive";
import ReactPaginate from "react-paginate";
import "./index.css";

const nonePrimitiveTypes = ["functions", "object", "array"];

const RenderValue = ({ val, tableClass, tableIndex }) => {
  if (nonePrimitiveTypes.some((n) => n === getDataType(val)))
    return (
      <AutoTable
        data={val}
        tableClass={tableClass}
        tableIndex={tableIndex + 1}
      />
    );
  return <RenderPrimitive value={val} />;
};

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

  const { usePagination, itemsPerPage } = {
    usePagination: options?.pagination?.usePagination,
    itemsPerPage: options?.pagination?.itemsPerPage,
  };

  const dataType = useMemo(() => {
    return getDataType(data);
  }, [data]);

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
    return Math.ceil(tableRows.length / itemsPerPage);
  }, [tableRows]);

  const currentItems = useMemo(() => {
    if (usePagination) {
      const endOffset = itemOffset + itemsPerPage;
      return tableRows.slice(itemOffset, endOffset);
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

  const RenderAsArray = () => {
    return (
      <>
        {currentItems.map((row, rowIndex) => (
          <tr
            key={`${tableIndex}_${rowIndex}`}
            onClick={() => handleRowClicked(`${tableIndex}_${rowIndex}`)}
            className={
              `${tableIndex}_${rowIndex}` === selectedRow
                ? `${tableIndex}_${rowIndex} active-row`
                : `${tableIndex}_${rowIndex}`
            }
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                <RenderValue
                  val={row[col]}
                  tableClass={tableClass}
                  tableIndex={tableIndex}
                />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const RenderAsPrimitive = () => {
    return (
      <>
        {currentItems.map((row, rowIndex) => (
          <tr key={`${tableIndex}_${rowIndex}`}>
            <td>
              <span>{row}</span>
            </td>
          </tr>
        ))}
      </>
    );
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tableRows.length;
    setItemOffset(newOffset);
  };

  return (
    <table {...props} className={tableClass}>
      {isPrimitiveArray ? null : (
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th key={colIndex} title={`${col}`}>
                {options.humanReadableHeaders ? getHumanReadable(col) : col}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {isPrimitiveArray ? <RenderAsPrimitive /> : <RenderAsArray />}
      </tbody>
      {/* Disable pagination for objects for now */}
      {usePagination && dataType === "array" ? (
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            </td>
          </tr>
        </tfoot>
      ) : null}
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
  options: {
    humanReadableHeaders: PropTypes.bool,
    pagination: {
      usePagination: PropTypes.bool,
      itemsPerPage: PropTypes.number,
    },
  },
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
