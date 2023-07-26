import Pagination from "./Pagination";

function TableFoot({ columns, onPageChange, pageCount }) {
  if (pageCount <= 1) return null;

  return (
    <tfoot>
      <tr>
        <td colSpan={columns.length}>
          <Pagination onPageChange={onPageChange} pageCount={pageCount} />
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFoot;
