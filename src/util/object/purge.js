import {clone} from './clone';

export function purge(obj, ...properties) {
  const copy = clone(obj);
  properties.forEach((property) => {
    delete copy[property];
  });
  return copy;
}
