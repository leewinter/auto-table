import { useState } from "react";
import { useTableHeadStyles } from "@lib/components/AutoTable/TableHead/useTableHeadStyles";
import { getHumanReadableString } from "@lib/utils";

type TableHeadParams = {
  isNonKeyValueArray: boolean;
  columns: Array<string>;
  humanReadableHeaders: boolean;
  handleColumnSort: (col: string, asc: boolean) => void;
  currentSortColumn: string;
};

export const TableHead: React.FC<TableHeadParams> = (props) => {
  const {
    isNonKeyValueArray,
    columns,
    humanReadableHeaders,
    handleColumnSort,
    currentSortColumn,
  } = props;
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const { styles } = useTableHeadStyles();

  const handleHeaderClick = (col: string) => {
    let sortAscending = true;
    if (col === currentSortColumn && sortAsc) {
      sortAscending = false;
    } else sortAscending = true;

    handleColumnSort(col, sortAscending);
    setSortAsc(sortAscending);
  };

  return isNonKeyValueArray ? (
    <thead></thead>
  ) : (
    <thead css={styles}>
      <tr>
        {columns.map((col: string, colIndex: number) => (
          <th
            key={colIndex}
            title={`${col}`}
            onClick={() => handleHeaderClick(col)}
          >
            {humanReadableHeaders ? getHumanReadableString(col) : col}
            {col === currentSortColumn ? (sortAsc ? "▼" : "▲") : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};
