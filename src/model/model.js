import {identity, compose, curry} from '../util/utils';
import {
  deleteVariables,
  groupBy,
  selectVariables,
  stableSort,
} from './transformers/index';
import {
  CalcVarBuilder,
  AggregatorBuilder,
  InterpolateBuilder,
  SetVarBuilder,
} from './builders/index';

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
  transform(transform) {
    return transformModel(this.data, transform);
  },
};

Object.assign(Model.prototype, modelPrototype);

function modelmaker(f) {
  return new Model(f);
}

export const model = () => modelmaker(identity);
