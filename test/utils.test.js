import { clone } from '../src/util/utils.js';

test('checks clone returns expected value', () => {
  expect(clone(1)).toBe(1);
});
