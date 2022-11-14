import {clone} from '../util/utils.js';

export function setVariableValue(table, variableName, value) {
  const newTable = clone(table);
  newTable.forEach((row) => {
    row[variableName] = value;
  });
  return newTable;
}
