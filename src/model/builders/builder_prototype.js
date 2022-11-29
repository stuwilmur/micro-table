import {compose, identity} from '../../util';

export const builderPrototype = {
  end() {
    return this.makeModel(compose(this._do(), this.model));
  },

  _do() {
    return identity;
  },
};
