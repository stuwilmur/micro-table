import {calculateVariable} from '../transformations';
import {identity} from '../../util';

const transform = (name, func) => (data) => calculateVariable(data, name, func);

export const CalcVarBuilderPrototype = {
  f: identity,

  called(name) {
    this.name = name;
    return this;
  },

  does(f) {
    this.f = f;
    return this;
  },

  _do() {
    return transform(this.name, this.f);
  },
};
