import {subBuilderPrototype} from './sub_builder_prototype.js';

export function SubBuilder(parent) {
  this.parent = parent;
}

Object.assign(SubBuilder.prototype, subBuilderPrototype);
