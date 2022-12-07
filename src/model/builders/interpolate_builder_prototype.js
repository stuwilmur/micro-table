import {interpolate} from '../transformations';

// prettier-ignore
const transform =
  (indexProperty, interpolatedProperty, ...groupProperties) =>
    (data) => interpolate(data,
      indexProperty,
      interpolatedProperty,
      ...groupProperties);

export const InterpolateBuilderPrototype = {
  y(...y) {
    this.interpolatedPropertyList = y;
    return this;
  },

  x(x) {
    this.indexProperty = x;
    return this;
  },

  groupBy(...groupProperties) {
    this.groupProperties = groupProperties;
    return this;
  },

  _do() {
    return transform(
      this.indexProperty,
      this.interpolatedPropertyList,
      ...this.groupProperties,
    );
  },
};
