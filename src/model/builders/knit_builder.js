import {KnitBuilderPrototype} from './knit_builder_prototype';
import {Builder} from './builder';
import {identity} from '../../util';

export function KnitBuilder(...args) {
  this.f = identity;

  Builder.call(this, ...args);
}

KnitBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: KnitBuilder,
  },
});

Object.assign(KnitBuilder.prototype, KnitBuilderPrototype);
