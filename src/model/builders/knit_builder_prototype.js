import {intersectTables} from '../transformations';

const transform = (incoming, property) => (data) =>
  intersectTables(data, incoming, property);

export const KnitBuilderPrototype = {
  with(incoming) {
    this.incoming = incoming;
    return this;
  },

  match(property) {
    this.property = property;
    return this;
  },

  _do() {
    return transform(this.incoming, this.property);
  },
};
