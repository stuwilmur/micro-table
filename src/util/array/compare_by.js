export function compareBy(property) {
  return (a, b) => a[property] - b[property];
}
