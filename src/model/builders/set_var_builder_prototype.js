import {setVariableValue} from '../transformations';

const transform = (name, value) => (data) =>
  setVariableValue(data, name, value);

export const SetVarBuilderPrototype = {
  called(name) {
    this.name = name;
    return this;
  },

  value(varValue) {
    this.varValue = varValue;
    return this;
  },

  _do() {
    return transform(this.name, this.varValue);
  },
};
