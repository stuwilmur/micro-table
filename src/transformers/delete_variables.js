import {purge} from '../util/utils';

export function deleteVariables(table, ...variableNames) {
  return table.map((row) => purge(row, ...variableNames));
}
