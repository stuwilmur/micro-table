import {groupAndFlatten} from '../../util';

export function groupBy(data, ...groupProperties) {
  return groupAndFlatten(data, ...groupProperties)
    .map((e) => e[groupProperties.length])
    .flat();
}
