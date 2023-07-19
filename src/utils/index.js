export const getDataType = (val) => {
  if (val != null) {
    if (Array.isArray(val)) return "array";
    return typeof val;
  }
  return null;
};
