import {clone} from '../util/utils';

export function deleteColumns(table, ...columnNames) {
  const newTable = clone(table);
  newTable.forEach((row) => {
    columnNames.forEach((columnnName) => {
      delete row[columnnName];
    });
  });
  return newTable;
}
