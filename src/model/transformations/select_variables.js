import {pick} from '../../util';

export function selectVariables(table, ...variableNames) {
  return table.map((row) => pick(row, ...variableNames));
}
