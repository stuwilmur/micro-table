import linearInterpolator from 'linear-interpolator';
import {clone, groupAndFlatten} from '../util/utils';

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

export function interpolate(
  data,
  indexProperty,
  interpolatedProperty,
  ...groupProperties
) {
  const groupedInterpolated = groupAndFlatten(data, ...groupProperties).map(
    (d) =>
      interpolateGroup(
        d[groupProperties.length],
        indexProperty,
        interpolatedProperty,
      ),
  );

  return groupedInterpolated.flat();
}
