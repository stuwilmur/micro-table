import {purge} from '../util/utils';

export function deleteColumns(table, ...columnNames) {
  return table.map((row) => purge(row, ...columnNames));
}
