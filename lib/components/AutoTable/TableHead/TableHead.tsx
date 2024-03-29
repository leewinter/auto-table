import { useTableHeadStyles } from "@lib/components/AutoTable/TableHead/useTableHeadStyles";
import { getHumanReadableString } from "@lib/utils";

type TableHeadParams = {
  isNonKeyValueArray: boolean;
  columns: Array<string>;
  humanReadableHeaders: boolean;
};

export const TableHead: React.FC<TableHeadParams> = (props) => {
  const { isNonKeyValueArray, columns, humanReadableHeaders } = props;
  const { styles } = useTableHeadStyles();

  return isNonKeyValueArray ? (
    <thead></thead>
  ) : (
    <thead css={styles}>
      <tr>
        {columns.map((col: string, colIndex: number) => (
          <th key={colIndex} title={`${col}`}>
            {humanReadableHeaders ? getHumanReadableString(col) : col}
          </th>
        ))}
      </tr>
    </thead>
  );
};
