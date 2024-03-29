import { useTableBodyStyles } from "@lib/components/AutoTable/TableBody/useTableBodyStyles";
import { AutoTableOptions } from "@lib/components/AutoTable/AutoTable";
import RenderNonKeyValue from "@lib/components/AutoTable/TableBody/RenderNonKeyValue";
import RenderArray from "@lib/components/AutoTable/TableBody/RenderArray";

interface TableBodyParams {
  isNonKeyValueArray: boolean;
  visibleRows: Array<unknown>;
  tableIndex: number;
  onRowClicked: (rowIdentifier: string) => void;
  selectedRow: string;
  columns: Array<string>;
  options: AutoTableOptions;
}

export const TableBody: React.FC<TableBodyParams> = (props) => {
  const {
    isNonKeyValueArray,
    visibleRows,
    tableIndex,
    onRowClicked,
    selectedRow,
    columns,
    options,
  } = props;
  const { styles } = useTableBodyStyles();

  return (
    <tbody css={styles}>
      {isNonKeyValueArray ? (
        <RenderNonKeyValue visibleRows={visibleRows} tableIndex={tableIndex} />
      ) : (
        <RenderArray
          onRowClicked={onRowClicked}
          selectedRow={selectedRow}
          columns={columns}
          options={options}
          visibleRows={visibleRows}
          tableIndex={tableIndex}
        />
      )}
    </tbody>
  );
};
