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

export function stableSort(data, ...keys) {
  return data.sort((a, b) => compareKeys(a, b, ...keys));
}
