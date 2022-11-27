export function SortKey(property, ascending) {
  this.property = property;
  this.ascending = ascending;
}

export function makeSortKey(property, ascending = true) {
  return new SortKey(property, ascending);
}
