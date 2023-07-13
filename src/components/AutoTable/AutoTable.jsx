import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import "./index.css";

export default function AutoTable({ data, tableClass, ...props }) {
  const [tableRows, setTableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");

  const getDataType = (val) => {
    if (val) {
      // ignore functions for now
      if (typeof val === "function") return null;
      if (Array.isArray(val)) return "array";
      if (typeof val === "object") return "object";
    }
    return null;
  };

  const dataType = useMemo(() => {
    return getDataType(data);
  }, [data]);

  const columns = useMemo(() => {
    if (dataType) {
      return Object.keys(dataType === "array" ? data[0] : data);
    }
  }, [data, dataType]);

  useEffect(() => {
    if (data) {
      if (dataType === "array") setTableRows(data);
      if (dataType === "object") setTableRows([data]);
    }
  }, [data, dataType]);

  const handleRowClicked = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  if (!data)
    return (
      <div>
        <p>No data found</p>
      </div>
    );

  return (
    <table {...props} className={tableClass}>
      <thead>
        <tr>
          {columns.map((col, colIndex) => (
            <th key={colIndex}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => handleRowClicked(rowIndex)}
            className={rowIndex === selectedRow ? "active-row" : null}
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col]}</td>
            ))}
          </tr>
        ))}
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
};

AutoTable.defaultProps = {
  data: null,
  tableClass: "styled-table",
};
