import {aggregateBy} from '../transformations/index';
import {SubAggregatorBuilder} from './sub_aggregator_builder';

// prettier-ignore
const transform =
  (aggregators, ...keys) =>
    (data) =>
      aggregateBy(data, aggregators, ...keys);

export const aggregatorBuilderPrototype = {
  aggregators: [],
  keys: [null],

  withAggregator() {
    return new SubAggregatorBuilder(this);
  },

  groupBy(...keys) {
    this.keys = keys;
    return this;
  },

  _addAggregator(aggregator) {
    this.aggregators.push(aggregator);
    return this;
  },

  _do() {
    return transform(this.aggregators, ...this.keys);
  },
};
