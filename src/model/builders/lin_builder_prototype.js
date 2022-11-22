import {FractionBuilder} from './fraction_builder';

const makeLinear = (m, c, x) => (x) => m * x + c;

export const linBuilderPrototype = {
  m: 1,
  c: 0,

  withMultiplier(m) {
    this.m = m;
    return this;
  },

  withConstant(c) {
    this.c = c;
    return this;
  },

  withFractionalConstant() {
    return new FractionBuilder(this);
  },

  _do() {
    return makeLinear(this.m, this.c);
  },
};
