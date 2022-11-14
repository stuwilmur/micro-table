export function keyFunctions(groupProperties) {
  return groupProperties.map((k) => (d) => d[k]);
}
