import {InterpolateBuilderPrototype} from './interpolate_builder_prototype';
import {Builder} from './builder';

export function InterpolateBuilder(...args) {
  this.interpolatedPropertyList = [];

  Builder.call(this, ...args);
}

InterpolateBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: InterpolateBuilder,
  },
});

Object.assign(InterpolateBuilder.prototype, InterpolateBuilderPrototype);
