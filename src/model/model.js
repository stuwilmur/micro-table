import {identity, compose, curry} from '../util/utils';
import {LinBuilder} from './builders/lin_builder';
import {
  deleteVariables,
  groupBy,
  selectVariables,
  stableSort,
} from '../transformers/index';

const addOne = (x) => x + 1;

function Model(data) {
  this.data = data;
}

function transformModel(model, transform, ...args) {
  return new Model(compose(curry(transform, ...args), model));
}

const modelPrototype = {
  lin() {
    return new LinBuilder(this.data, modelmaker);
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
