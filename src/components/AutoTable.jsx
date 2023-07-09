import r2wc from "@r2wc/react-to-web-component";
import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";

const getType = (val) => {
  if (val) {
    // ignore functions for now
    if (typeof val === "function") return null;
    if (Array.isArray(val)) return "array";
    if (typeof val === "object") return "object";
  }
  return null;
};

export default function AutoTable({ data, backgroundColor, ...props }) {
  const [tableRows, setTableRows] = useState([]);

  const dataType = useMemo(() => {
    return getType(data);
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

  if (!data)
    return (
      <div>
        <p>No data found</p>
      </div>
    );

  return (
    <div {...props} style={backgroundColor && { backgroundColor }}>
      <table>
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th key={colIndex}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

AutoTable.propTypes = {
  /**
   * Data to display. Can be an array or object type
   */
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
};

AutoTable.defaultProps = {
  data: null,
  backgroundColor: null,
};

// Used for web component version
export const autoTableComponentInit = () => {
  const t = r2wc(AutoTable, {
    props: {
      data: "json",
    },
  });

  customElements.define("auto-table", t);
};
