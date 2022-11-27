import {stableSort} from '../transformers/index';
import {makeSortKey} from '../types';

// prettier-ignore
const transform =
  (...sortKeys) =>
    (data) =>
      stableSort(data, ...sortKeys);

export const SortBuilderPrototype = {
  sortKeyList: [],

  by(property, ascending = true) {
    this.sortKeyList.push(makeSortKey(property, ascending));
    return this;
  },

  _do() {
    return transform(...this.sortKeyList);
  },
};
