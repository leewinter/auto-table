import RenderDataValue from "./RenderDataValue.jsx";

function TableBody({
  isNonKeyValueArray,
  visibleRows,
  tableIndex,
  onRowClicked,
  selectedRow,
  columns,
  tableClass,
  options,
}) {
  const RenderAsArray = () => {
    return (
      <>
        {visibleRows.map((row, rowIndex) => (
          <tr
            key={`${tableIndex}_${rowIndex}`}
            onClick={() => onRowClicked(`${tableIndex}_${rowIndex}`)}
            className={
              `${tableIndex}_${rowIndex}` === selectedRow
                ? `${tableIndex}_${rowIndex} active-row`
                : `${tableIndex}_${rowIndex}`
            }
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                <RenderDataValue
                  val={row[col]}
                  tableClass={tableClass}
                  tableIndex={tableIndex}
                  options={options}
                />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const RenderAsNonKeyValue = () => {
    return (
      <>
        {visibleRows.map((row, rowIndex) => (
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
    <tbody>
      {isNonKeyValueArray ? <RenderAsNonKeyValue /> : <RenderAsArray />}
    </tbody>
  );
}

export default TableBody;
