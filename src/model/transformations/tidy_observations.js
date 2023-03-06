import {clone} from '../../util';

export function tidyObservations(data, observations, descriptor, quantity) {
  if (observations.length < 1) {
    return clone(data);
  }

  const nestedArray = [];

  observations.forEach((keyToKeep) => {
    const tidyGroup = data.map((originalObj) => {
      const obj = Object.assign({}, originalObj);

      observations.forEach((key) => {
        if (key != keyToKeep) {
          delete obj[key];
        }
      });

      Object.defineProperty(
        obj,
        quantity,
        Object.getOwnPropertyDescriptor(obj, keyToKeep),
      );

      delete obj[keyToKeep];
      obj[descriptor] = keyToKeep;
      return obj;
    });

    nestedArray.push(tidyGroup);
  });

  return nestedArray.flat();
}
