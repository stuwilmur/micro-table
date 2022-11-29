import {groupAndFlatten} from '../../util/utils';

export function groupBy(data, ...groupProperties) {
  return groupAndFlatten(data, ...groupProperties)
    .map((e) => e[groupProperties.length])
    .flat();
}
