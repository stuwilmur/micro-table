import {identity} from '../../util/function';
import {Aggregator} from './aggregator';

export const subAggregatorBuilderPrototype = {
  func: identity,
  formula(func) {
    this.func = func;
    return this;
  },
  called(name) {
    this.name = name;
    return this;
  },
  end() {
    return this.parent._addAggregator(new Aggregator(this.name, this.func));
  },
};
