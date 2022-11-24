import {pick} from '../../util/utils';

export function selectVariables(table, ...variableNames) {
  return table.map((row) => pick(row, ...variableNames));
}
