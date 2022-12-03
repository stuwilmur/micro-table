import {flatRollup} from 'd3';
import {keyFunctions} from '../../util';

function aggregate(v, listOfAggregators) {
  const obj = {};
  listOfAggregators.forEach((aggregator) => {
    obj[aggregator.name] = aggregator.f(v);
  });

  return obj;
}

function mergeRolledUpList(list, keys) {
  const rollupObject = list[keys.length];
  const keysObject = {};

  keys.forEach((key, index) => {
    keysObject[key] = list[index];
  });
  return {...keysObject, ...rollupObject};
}

export function aggregateBy(data, listOfAggregators, ...keys) {
  const curriedAggregators = (v) => aggregate(v, listOfAggregators);
  const rolledUpData = flatRollup(
    data,
    curriedAggregators,
    ...keyFunctions(keys),
  );

  const listOfRowObjects = rolledUpData.map((element) =>
    mergeRolledUpList(element, keys),
  );

  return listOfRowObjects;
}
