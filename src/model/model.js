import {identity, compose} from '../util/utils.js';
import {LinBuilder} from './builders/lin_builder.js';

const addOne = (x) => x + 1;

function Model(data) {
  this.data = data;
}

export const modelPrototype = {
  lin() {
    return new LinBuilder(this.data, modelmaker);
  },
  add() {
    return new Model(compose(addOne, this.data));
  },
};

Object.assign(Model.prototype, modelPrototype);

export function modelmaker(f) {
  return new Model(f);
}

export const model = () => modelmaker(identity);
