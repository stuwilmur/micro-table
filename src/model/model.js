import {identity, compose, curry} from '../util';
import {deleteVariables, groupBy, selectVariables} from './transformations';
import {
  CalcVarBuilder,
  AggregatorBuilder,
  InterpolateBuilder,
  SetVarBuilder,
} from './builders';
import {SortBuilder} from './builders/sort_builder';

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
  const() {
    return new SetVarBuilder(this.data, modelmaker);
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
  select(...args) {
    return transformModel(this.data, selectVariables, ...args);
  },

  sort() {
    return new SortBuilder(this.data, modelmaker);
  },
  tele() {
    return new AggregatorBuilder(this.data, modelmaker);
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
