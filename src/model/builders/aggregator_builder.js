import {aggregatorBuilderPrototype} from './aggregator_builder_prototype';
import {Builder} from './builder';

export function AggregatorBuilder(...args) {
  this.aggregators = [];
  this.keys = [null];

  Builder.call(this, ...args);
}

AggregatorBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: AggregatorBuilder,
  },
});

Object.assign(AggregatorBuilder.prototype, aggregatorBuilderPrototype);
