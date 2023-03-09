import {tidyObservations} from '../transformations';

const transform = (observations, descriptor, quantity) => (data) =>
  tidyObservations(data, observations, descriptor, quantity);

export const TidyBuilderPrototype = {
  collapse(...observationKeys) {
    this.observations = observationKeys;
    return this;
  },

  to(descriptor) {
    this.descriptor = descriptor;
    return this;
  },

  quantity(quantity) {
    this.q = quantity;
    return this;
  },

  _do() {
    return transform(this.observations, this.descriptor, this.q);
  },
};
