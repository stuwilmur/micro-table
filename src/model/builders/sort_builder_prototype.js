import {stableSort} from '../transformers/index';
import {makeSortKey} from '../types';

// prettier-ignore
const transform =
  (...sortKeys) =>
    (data) =>
      stableSort(data, ...sortKeys);

export const SortBuilderPrototype = {
  sortKeyList: [],

  inc(property) {
    this.sortKeyList.push(makeSortKey(property, true));
    return this;
  },

  dec(property) {
    this.sortKeyList.push(makeSortKey(property, false));
    return this;
  },

  _do() {
    return transform(...this.sortKeyList);
  },
};
