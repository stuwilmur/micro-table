import {CalcVarBuilderPrototype} from './calc_var_builder_prototype';
import {Builder} from './builder';

export function CalcVarBuilder(...args) {
  Builder.call(this, ...args);
}

CalcVarBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: CalcVarBuilder,
  },
});

Object.assign(CalcVarBuilder.prototype, CalcVarBuilderPrototype);
