import { getHumanReadable } from "../../utils";

function TableHead({
  isNonKeyValueArray,
  columns,
  humanReadableHeaders = true,
}) {
  return isNonKeyValueArray ? null : (
    <thead>
      <tr>
        {columns.map((col, colIndex) => (
          <th key={colIndex} title={`${col}`}>
            {humanReadableHeaders ? getHumanReadable(col) : col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
