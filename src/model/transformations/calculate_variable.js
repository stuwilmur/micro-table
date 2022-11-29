import {clone} from '../../util';

export function calculateVariable(table, name, func) {
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
