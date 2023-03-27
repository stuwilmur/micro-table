import {identity, compose, curry} from '../util';

import {
  deleteVariables,
  filterRows,
  groupBy,
  mergeTables,
  selectVariables,
} from './transformations';

import {
  CalcVarBuilder,
  AggregatorBuilder,
  InterpolateBuilder,
  SetVarBuilder,
  SortBuilder,
  TidyBuilder,
} from './builders';

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
  filter(arg) {
    return transformModel(this.data, filterRows, arg);
  },
  group(...args) {
    return transformModel(this.data, groupBy, ...args);
  },
  interp() {
    return new InterpolateBuilder(this.data, modelmaker);
  },
  merge(arg) {
    return transformModel(this.data, mergeTables, arg);
  },
  reduce() {
    return new AggregatorBuilder(this.data, modelmaker);
  },
  select(...args) {
    return transformModel(this.data, selectVariables, ...args);
  },
  sort() {
    return new SortBuilder(this.data, modelmaker);
  },
  tidy() {
    return new TidyBuilder(this.data, modelmaker);
  },
  then(subsequentModel) {
    return new Model(compose(subsequentModel.data, this.data));
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
