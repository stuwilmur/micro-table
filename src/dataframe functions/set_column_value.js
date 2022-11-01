import {clone} from '../util/utils.js';

export function setColumnValue(table, columnName, value) {
  const newTable = clone(table);
  newTable.forEach((row) => {
    row[columnName] = value;
  });
  return newTable;
}
