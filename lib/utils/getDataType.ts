export const getDataType = (val: unknown) => {
  if (val != null) {
    if (Array.isArray(val)) return "array";
    return typeof val;
  }
  return null;
};
