import {linBuilderPrototype} from './lin_builder_prototype.js';
import {Builder} from './builder.js';

export function LinBuilder(...args) {
  Builder.call(this, ...args);
}

LinBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: LinBuilder,
  },
});

Object.assign(LinBuilder.prototype, linBuilderPrototype);
