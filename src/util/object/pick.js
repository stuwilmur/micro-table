export function pick(obj, ...properties) {
  const copy = {};
  properties.forEach((property) => {
    if (property in obj) {
      copy[property] = obj[property];
    }
  });
  return copy;
}
