// prettier-ignore
import {
  subAggregatorBuilderPrototype,
} from './sub_aggregator_builder_prototype';
import {SubBuilder} from './sub_builder';

export function SubAggregatorBuilder(...args) {
  SubBuilder.call(this, ...args);
}

SubAggregatorBuilder.prototype = Object.create(SubBuilder.prototype, {
  constructor: {
    value: SubAggregatorBuilder,
  },
});

Object.assign(SubAggregatorBuilder.prototype, subAggregatorBuilderPrototype);
