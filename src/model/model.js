import {identity, compose, curry} from '../util/utils';
import {SetVarBuilder} from './builders/set_var_builder';
import {
  deleteVariables,
  groupBy,
  selectVariables,
  stableSort,
} from '../transformers/index';
import {CalcVarBuilder} from './builders/calc_var_builder';
import {InterpolateBuilder} from './builders/interpolate_builder';
import {AggregatorBuilder} from './builders/aggregator_builder';

const addOne = (x) => x + 1;

function Model(data) {
  this.data = data;
}

function transformModel(model, transform, ...args) {
  return new Model(compose(curry(transform, ...args), model));
}

const modelPrototype = {
  setVar() {
    return new SetVarBuilder(this.data, modelmaker);
  },
  calcVar() {
    return new CalcVarBuilder(this.data, modelmaker);
  },
  interpolate() {
    return new InterpolateBuilder(this.data, modelmaker);
  },
  aggregate() {
    return new AggregatorBuilder(this.data, modelmaker);
  },
  add() {
    return new Model(compose(addOne, this.data));
  },
  drop(...args) {
    return transformModel(this.data, deleteVariables, ...args);
  },
  sort(...args) {
    return transformModel(this.data, stableSort, ...args);
  },
  select(...args) {
    return transformModel(this.data, selectVariables, ...args);
  },
  group(...args) {
    return transformModel(this.data, groupBy, ...args);
  },
};

Object.assign(Model.prototype, modelPrototype);

function modelmaker(f) {
  return new Model(f);
}

export const model = () => modelmaker(identity);
