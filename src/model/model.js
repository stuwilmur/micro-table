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
  calc() {
    return new CalcVarBuilder(this.data, modelmaker);
  },
  drop(...args) {
    return transformModel(this.data, deleteVariables, ...args);
  },
  group(...args) {
    return transformModel(this.data, groupBy, ...args);
  },
  interp() {
    return new InterpolateBuilder(this.data, modelmaker);
  },
  lump() {
    return new AggregatorBuilder(this.data, modelmaker);
  },
  select(...args) {
    return transformModel(this.data, selectVariables, ...args);
  },
  set() {
    return new SetVarBuilder(this.data, modelmaker);
  },
  sort(...args) {
    return transformModel(this.data, stableSort, ...args);
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
