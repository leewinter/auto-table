import { useState } from "react";

function TableSearch({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = ({ target: { value } }) => {
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
}

export default TableSearch;
