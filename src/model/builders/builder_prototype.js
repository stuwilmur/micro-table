import {compose} from '../../util/function';

export const builderPrototype = {
  end() {
    return this.makeModel(compose(this._do(), this.model));
  },

  _do() {
    return identity;
  },
};
