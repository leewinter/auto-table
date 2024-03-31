import { DynamicKeyValue } from "@lib/types";

export const searchObjectArray = (
  items: object[],
  columns: string[],
  query: string
) => {
  const results = items.filter((row: object) => {
    const rowAsDynamicKeyValue: DynamicKeyValue = row;
    const matchedColumns = columns.filter((col: keyof DynamicKeyValue) => {
      const propertyValue = rowAsDynamicKeyValue[col];
      if (!propertyValue) return false;
      if (propertyValue.toString().toLowerCase().includes(query.toLowerCase()))
        return true;
      return false;
    });
    let match: boolean = Boolean(matchedColumns.length);
    if (!columns.length && !match)
      match = row.toString().toLowerCase().includes(query.toLowerCase());
    return match;
  });

  return results;
};
