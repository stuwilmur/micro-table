import {CalcVarBuilderPrototype} from './calc_var_builder_prototype';
import {Builder} from './builder';
import {identity} from '../../util';

export function CalcVarBuilder(...args) {
  this.f = identity;

  Builder.call(this, ...args);
}

CalcVarBuilder.prototype = Object.create(Builder.prototype, {
  constructor: {
    value: CalcVarBuilder,
  },
});

Object.assign(CalcVarBuilder.prototype, CalcVarBuilderPrototype);
