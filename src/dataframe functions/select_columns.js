import {pick} from '../util/utils';

export function selectColumns(table, ...columnNames) {
  return table.map((row) => pick(row, ...columnNames));
}
