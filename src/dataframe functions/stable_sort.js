import {ascending} from 'd3';

function compareAscending(a, b, key) {
  return ascending(a[key], b[key]);
}

function compareKeys(a, b, ...keys) {
  let cmp = NaN;
  if (keys.length > 0) {
    keys.forEach((key) => {
      cmp = cmp || compareAscending(a, b, key);
    });
  }
  return cmp;
}

// prettier-ignore
const curry = (...keys) => (a, b) => compareKeys(a, b, ...keys);

export function stableSort(data, ...keys) {
  const sortFunction = curry(...keys);
  return data.sort(sortFunction);
}
