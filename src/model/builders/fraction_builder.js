import {fractionBuilderPrototype} from './fraction_builder_prototype';
import {SubBuilder} from './sub_builder';

export function FractionBuilder(...args) {
  SubBuilder.call(this, ...args);
}

FractionBuilder.prototype = Object.create(SubBuilder.prototype, {
  constructor: {
    value: FractionBuilder,
  },
});

Object.assign(FractionBuilder.prototype, fractionBuilderPrototype);
