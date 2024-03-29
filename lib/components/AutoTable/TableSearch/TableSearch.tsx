import { useState } from "react";

type TableSearchParams = {
  onSearchChange: (query: string) => void;
};

export const TableSearch: React.FC<TableSearchParams> = ({
  onSearchChange,
}) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setSearch(value);
    if (onSearchChange) onSearchChange(value);
  };

  return (
    <>
      <label htmlFor="tsearch">Search</label>&#160;
      <input
        type="search"
        value={search}
        onChange={handleSearchChange}
        id="tsearch"
        name="tsearch"
      />
    </>
  );
};

export default TableSearch;
