import {flatRollup} from 'd3';

function aggregate(v, listOfAggregators) {
  const obj = {};
  listOfAggregators.forEach((aggregator) => {
    obj[aggregator.name] = aggregator.f(v);
  });

  return obj;
}

const curry = (listOfAggregators) => (v) => aggregate(v, listOfAggregators);

export function aggregateOn(data, listOfAggregators, ...keys) {
  const curriedAggregators = curry(listOfAggregators);
  const keyFunctions = keys.map((key) => (d) => d[key]);
  const rolledUpData = flatRollup(data, curriedAggregators, ...keyFunctions);
  const listOfRowObjects = [];

  rolledUpData.forEach((row) => {
    const rollupObject = row[keys.length];
    const keysObject = {};

    keys.forEach((key, index) => {
      keysObject[key] = row[index];
    });
    const mergedObject = {...keysObject, ...rollupObject};

    listOfRowObjects.push(mergedObject);
  });

  return listOfRowObjects;
}
