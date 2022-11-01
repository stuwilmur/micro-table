import {clone} from '../util/utils';

export function calculateColumn(table, name, func) {
  const newTable = clone(table);

  function getRowAboveCurrentIndex(currentRowIndex, rowsAbove) {
    return newTable[currentRowIndex - rowsAbove];
  }

  newTable.forEach((row, index) => {
    row[name] = func(row, (rowsAbove) => {
      return getRowAboveCurrentIndex(index, rowsAbove);
    });
  });
  return newTable;
}
