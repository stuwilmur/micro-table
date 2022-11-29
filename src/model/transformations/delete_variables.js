import {purge} from '../../util';

export function deleteVariables(table, ...variableNames) {
  return table.map((row) => purge(row, ...variableNames));
}
