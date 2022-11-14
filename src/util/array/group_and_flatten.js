import {flatGroup} from 'd3';
import {keyFunctions} from './key_functions';
import {clone} from '../object/clone';

export function groupAndFlatten(data, ...groupProperties) {
  if (groupProperties.length > 0) {
    return flatGroup(data, ...keyFunctions(groupProperties));
  } else {
    return [[clone(data)]];
  }
}
