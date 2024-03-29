export const getHumanReadableString = (val: string) => {
  const reFindHumps = /([A-Z]){1}([a-z0-9]){1}/g;
  const re1stLower = /^[a-z]{1}/;
  let label = val.replace(reFindHumps, " $1$2");

  if (re1stLower.test(label)) {
    label = label.slice(0, 1).toUpperCase() + label.slice(1);
  }
  return label;
};
