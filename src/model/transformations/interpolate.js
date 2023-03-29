import {clone, groupAndFlatten, linearInterpolator} from '../../util';

function getSeriesFromObjectList(list, indexProperty, valueProperty) {
  return list.map((obj) => [obj[indexProperty], obj[valueProperty]]);
}

function isNullOrNaN(d) {
  return d === null || isNaN(d);
}

function removeBlanksFromSeries(series) {
  return series.filter((d) => !isNullOrNaN(d[1]));
}

function interpolateGroup(
  group,
  indexProperty,
  interpolatedPropertyList,
  extrapolate,
) {
  const interpolators = interpolatedPropertyList.map((interpolatedProperty) =>
    linearInterpolator(
      removeBlanksFromSeries(
        getSeriesFromObjectList(group, indexProperty, interpolatedProperty),
      ),
      extrapolate,
    ),
  );
  return group.map((d) => {
    const e = clone(d);
    interpolatedPropertyList.forEach((interpolatedProperty, i) => {
      const interpolator = interpolators[i];
      e[interpolatedProperty] = interpolator(e[indexProperty]);
    });
    return e;
  });
}

export function interpolate(
  data,
  indexProperty,
  interpolatedPropertyList,
  extrapolate,
  ...groupProperties
) {
  const groupedInterpolated = groupAndFlatten(data, ...groupProperties).map(
    (d) =>
      interpolateGroup(
        d[groupProperties.length],
        indexProperty,
        interpolatedPropertyList,
        extrapolate,
      ),
  );

  return groupedInterpolated.flat();
}
