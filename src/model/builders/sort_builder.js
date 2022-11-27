import {SortBuilderPrototype} from './sort_builder_prototype';
import {Builder} from './builder';

export function SortBuilder(...args) {
  Builder.call(this, ...args);
}

SortBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: SortBuilder,
  },
});

Object.assign(SortBuilder.prototype, SortBuilderPrototype);
