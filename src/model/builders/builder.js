import {builderPrototype} from './builder_prototype';

export function Builder(model, makeModel) {
  this.model = model;
  this.makeModel = makeModel;
}

Object.assign(Builder.prototype, builderPrototype);
