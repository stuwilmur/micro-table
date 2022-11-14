export function pick(obj, ...properties) {
  const copy = {};
  properties.forEach((property) => {
    copy[property] = obj[property];
  });
  return copy;
}
