import {linBuilderPrototype} from './lin_builder_prototype';
import {Builder} from './builder';

export function LinBuilder(...args) {
  Builder.call(this, ...args);
}

LinBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: LinBuilder,
  },
});

Object.assign(LinBuilder.prototype, linBuilderPrototype);
