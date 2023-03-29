import {interpolate} from '../transformations';

// prettier-ignore
const transform =
  (indexProperty, interpolatedProperty, extrapolate, ...groupProperties) =>
    (data) => interpolate(data,
      indexProperty,
      interpolatedProperty,
      extrapolate,
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

  noExtrap() {
    this.extrapolate = false;
    return this;
  },

  _do() {
    return transform(
      this.indexProperty,
      this.interpolatedPropertyList,
      this.extrapolate,
      ...this.groupProperties,
    );
  },
};
