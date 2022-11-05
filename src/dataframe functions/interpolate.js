import linearInterpolator from 'linear-interpolator';
import {flatGroup} from 'd3';
import {clone} from '../util/utils';

function compareBy(property) {
  return (a, b) => a[property] - b[property];
}

function getSeriesFromObjectList(list, indexProperty, valueProperty) {
  return list.map((obj) => [obj[indexProperty], obj[valueProperty]]);
}

function isNullOrNaN(d) {
  return d === null || isNaN(d);
}

function removeBlanksFromSeries(series) {
  return series.filter((d) => !isNullOrNaN(d[1]));
}

function interpolateGroup(group, indexProperty, interpolatedProperty) {
  const interpolator = linearInterpolator(
    removeBlanksFromSeries(
      getSeriesFromObjectList(group, indexProperty, interpolatedProperty),
    ),
  );
  return group.map((d) => {
    const e = clone(d);
    e[interpolatedProperty] = interpolator(e[indexProperty]);
    return e;
  });
}

function keyFunctions(groupProperties) {
  return groupProperties.map((k) => (d) => d[k]);
}

function groupAndFlatten(data, indexProperty, ...groupProperties) {
  if (groupProperties.length > 0) {
    return flatGroup(
      data.sort(compareBy(indexProperty)),
      ...keyFunctions(groupProperties),
    );
  } else {
    return [[clone(data)]];
  }
}

export function interpolate(
  data,
  indexProperty,
  interpolatedProperty,
  ...groupProperties
) {
  const groupedInterpolated = groupAndFlatten(
    data,
    indexProperty,
    ...groupProperties,
  ).map((d) =>
    interpolateGroup(
      d[groupProperties.length],
      indexProperty,
      interpolatedProperty,
    ),
  );

  return groupedInterpolated.flat();
}
