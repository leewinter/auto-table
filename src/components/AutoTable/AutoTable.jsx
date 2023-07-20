import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { getDataType, getHumanReadable } from "../../utils";
import RenderPrimitive from "../RenderPrimitive";
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
        {tableRows.map((row, rowIndex) => (
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
        {tableRows.map((row, rowIndex) => (
          <tr key={`${tableIndex}_${rowIndex}`}>
            <td>
              <span>{row}</span>
            </td>
          </tr>
        ))}
      </>
    );
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
  },
};

AutoTable.defaultProps = {
  data: null,
  tableClass: "styled-table",
  tableIndex: 0,
  options: {
    humanReadableHeaders: true,
  },
};
