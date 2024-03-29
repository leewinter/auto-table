import Pagination from "@lib/components/AutoTable/Pagination";

type TableFootParams = {
  pageCount: number;
  columns: Array<string>;
  onPageChange: (selected: number) => void;
  usePagination: boolean;
};

export const TableFoot: React.FC<TableFootParams> = (props) => {
  const { columns, onPageChange, pageCount, usePagination } = props;

  if (pageCount <= 1) return null;
  if (!usePagination) return null;

  return (
    <tfoot>
      <tr>
        <td colSpan={columns.length}>
          <Pagination onPageChange={onPageChange} pageCount={pageCount} />
        </td>
      </tr>
    </tfoot>
  );
};
