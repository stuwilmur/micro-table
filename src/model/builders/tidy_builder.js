import {TidyBuilderPrototype} from './tidy_builder_prototype';
import {Builder} from './builder';

export function TidyBuilder(...args) {
  this.observations = [];

  Builder.call(this, ...args);
}

TidyBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: TidyBuilder,
  },
});

Object.assign(TidyBuilder.prototype, TidyBuilderPrototype);
