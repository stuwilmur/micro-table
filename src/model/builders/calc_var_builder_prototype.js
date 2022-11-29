import {calculateVariable} from '../transformations/index';
import {identity} from '../../util/function';

const transform = (name, func) => (data) => calculateVariable(data, name, func);

export const CalcVarBuilderPrototype = {
  formula: identity,

  called(name) {
    this.name = name;
    return this;
  },

  formula(formula) {
    this.formula = formula;
    return this;
  },

  _do() {
    return transform(this.name, this.formula);
  },
};
