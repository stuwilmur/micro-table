export function tidyObservations(data, observations, descriptor, quantity) {
  const nestedArray = [];

  observations.forEach((keyToKeep) => {
    const tidyGroup = data.map((originalObj) => {
      const obj = Object.assign({}, originalObj);

      observations.forEach((key) => {
        if (key != keyToKeep) {
          delete obj[key];
        }
      });

      const valueToKeep = obj[keyToKeep];
      delete obj[keyToKeep];
      obj[descriptor] = keyToKeep;
      obj[quantity] = valueToKeep;
      return obj;
    });

    nestedArray.push(tidyGroup);
  });

  return nestedArray.flat();
}
