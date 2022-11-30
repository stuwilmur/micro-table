import {identity} from '../../util';
import {Aggregator} from '../types';

export const subAggregatorBuilderPrototype = {
  f: identity,
  does(f) {
    this.f = f;
    return this;
  },
  called(name) {
    this.name = name;
    return this;
  },
  end() {
    return this.parent._addAggregator(new Aggregator(this.name, this.f));
  },
};
