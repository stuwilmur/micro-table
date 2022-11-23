import {SetVarBuilderPrototype} from './set_var_builder_prototype';
import {Builder} from './builder';

export function SetVarBuilder(...args) {
  Builder.call(this, ...args);
}

SetVarBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: SetVarBuilder,
  },
});

Object.assign(SetVarBuilder.prototype, SetVarBuilderPrototype);
