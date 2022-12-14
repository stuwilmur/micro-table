import {clone} from '../../util';

export function setVariableValue(table, variableName, value) {
  const newTable = clone(table);
  newTable.forEach((row) => {
    row[variableName] = value;
  });
  return newTable;
}
