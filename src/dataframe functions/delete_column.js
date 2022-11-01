import {clone} from '../util/utils';

export function deleteColumn(table, name) {
  const newTable = clone(table);
  newTable.forEach((row) => {
    delete row[name];
  });
  return newTable;
}
