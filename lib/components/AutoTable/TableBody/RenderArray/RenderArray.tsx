import RenderDataValue from "@lib/components/AutoTable/TableBody/RenderDataValue";
import { TableContainerOptions } from "@lib/components/AutoTable/TableContainer/TableContainer";
import { DynamicKeyValue } from "@lib/types";

type RenderArrayParams = {
  visibleRows: Array<unknown>;
  tableIndex: number;
  onRowClicked: (rowIdentifier: string) => void;
  selectedRow: string;
  columns: Array<string>;
  options: TableContainerOptions;
};

export const RenderArray: React.FC<RenderArrayParams> = (props) => {
  const {
    visibleRows,
    tableIndex,
    onRowClicked,
    selectedRow,
    columns,
    options,
  } = props;

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
          {columns.map((col, colIndex) => {
            const rowAsDynamicKeyValue = row as DynamicKeyValue;
            const dynamicColIndex: keyof DynamicKeyValue = col;
            return (
              <td key={colIndex}>
                <RenderDataValue
                  value={rowAsDynamicKeyValue[dynamicColIndex]}
                  tableIndex={tableIndex}
                  options={options}
                />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
