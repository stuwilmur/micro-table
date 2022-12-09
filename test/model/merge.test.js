import model from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data
const data0 = [
  {n: 1, a: 1, b: 2, c: 3},
  {n: 2, a: 2, b: 4, c: 6},
  {n: 3, a: 3, b: 6, c: 9},
];

const data1a = [
  {n: 1, a: 1, b: 2, c: 3},
  {n: 2, a: 2, b: 4, c: 6},
  {n: 3, a: 3, b: 6, c: 9},
];

const data1b = [
  {a: 1, b: -2, d: 4},
  {a: 2, b: -4, d: 8},
  {a: 3, b: -6, d: 12},
  {a: 4, b: -8, d: 16},
];

const data1c = [
  {n: 1, a: 1, b: -2, c: 3, d: 4},
  {n: 2, a: 2, b: -4, c: 6, d: 8},
  {n: 3, a: 3, b: -6, c: 9, d: 12},
];

// Tests

test('test0: merge with self gives self', () => {
  expect(areObjectsEqual(model().merge(data0).data(data0), data0)).toBeTruthy();
});

test('test1: merge with longer table', () => {
  expect(
    areObjectsEqual(model().merge(data1b).data(data1a), data1c),
  ).toBeTruthy();
});
