interface RenderNonKeyValueParams {
  visibleRows: Array<unknown>;
  tableIndex: number;
}

export const RenderNonKeyValue: React.FC<RenderNonKeyValueParams> = (props) => {
  const { visibleRows, tableIndex } = props;

  return (
    <>
      {visibleRows.map((row, rowIndex) => (
        <tr key={`${tableIndex}_${rowIndex}`}>
          <td>
            <span>{`${row}`}</span>
          </td>
        </tr>
      ))}
    </>
  );
};
