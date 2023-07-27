export const getDataType = (val) => {
  if (val != null) {
    if (Array.isArray(val)) return "array";
    return typeof val;
  }
  return null;
};

export const getHumanReadable = (val) => {
  let reFindHumps = /([A-Z]){1}([a-z0-9]){1}/g;
  let re1stLower = /^[a-z]{1}/;
  let label = val.replace(reFindHumps, " $1$2");

  if (re1stLower.test(label)) {
    label = label.substr(0, 1).toUpperCase() + label.substring(1);
  }
  return label;
};

export const nonePrimitiveTypes = ["functions", "object", "array"];

export const filterArray = (query, prop, array, caseInsensitive = true) => {
  if (!query) return array;
  let filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    let propValueByRow = array[i][prop];
    if (caseInsensitive) {
      propValueByRow = propValueByRow.toLowerCase();
      query = query.toLowerCase();
    }
    if (propValueByRow != null && propValueByRow.toString().includes(query)) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};
