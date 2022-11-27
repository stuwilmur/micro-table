import {ascending, descending} from 'd3';

function compareAscending(a, b, key) {
  const comparator = key.ascending ? ascending : descending;
  return comparator(a[key.property], b[key.property]);
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
