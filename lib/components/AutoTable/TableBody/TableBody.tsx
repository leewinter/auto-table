import { useTableBodyStyles } from "@lib/components/AutoTable/TableBody/useTableBodyStyles";
import { TableContainerOptions } from "@lib/components/AutoTable/TableContainer/TableContainer";
import RenderNonKeyValue from "@lib/components/AutoTable/TableBody/RenderNonKeyValue";
import RenderArray from "@lib/components/AutoTable/TableBody/RenderArray";

type TableBodyParams = {
  isNonKeyValueArray: boolean;
  visibleRows: Array<unknown>;
  tableIndex: number;
  onRowClicked: (rowIdentifier: string) => void;
  selectedRow: string;
  columns: Array<string>;
  options: TableContainerOptions;
};

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
