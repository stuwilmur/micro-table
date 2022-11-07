import {flatGroup} from 'd3';

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function areObjectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function purge(obj, ...properties) {
  const copy = clone(obj);
  properties.forEach((property) => {
    delete copy[property];
  });
  return copy;
}

export function pick(obj, ...properties) {
  const copy = {};
  properties.forEach((property) => {
    copy[property] = obj[property];
  });
  return copy;
}

export function keyFunctions(groupProperties) {
  return groupProperties.map((k) => (d) => d[k]);
}

export function groupAndFlatten(data, ...groupProperties) {
  if (groupProperties.length > 0) {
    return flatGroup(data, ...keyFunctions(groupProperties));
  } else {
    return [[clone(data)]];
  }
}

export function compareBy(property) {
  return (a, b) => a[property] - b[property];
}
