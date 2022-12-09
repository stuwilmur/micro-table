import {mergeTables} from '../../../src/model/transformations';
import {areObjectsEqual} from '../../../src/util';

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

const data2a = [
  {n: 1, a: 1, b: -2, d: 4},
  {n: 2, a: 2, b: -4, d: 8},
  {n: 3, a: 3, b: -6, d: 12},
  {n: 4, a: 4, b: -8, d: 16},
];

const data2b = [
  {n: 1, a: 1, b: 2, c: 3},
  {n: 2, a: 2, b: 4, c: 6},
  {n: 3, a: 3, b: 6, c: 9},
];

const data2c = [
  {n: 1, a: 1, b: 2, d: 4, c: 3},
  {n: 2, a: 2, b: 4, d: 8, c: 6},
  {n: 3, a: 3, b: 6, d: 12, c: 9},
];

const data3 = [
  {n: 1, a: 1, b: 2, c: 3},
  {n: 2, a: 2, b: 4, c: 6},
  {n: 3, a: 3, b: 6, c: 9},
];

// Tests

test('test0: merge with self gives self', () => {
  expect(areObjectsEqual(mergeTables(data0, data0), data0)).toBeTruthy();
});

test('test1: right table longer', () => {
  expect(areObjectsEqual(mergeTables(data1a, data1b), data1c)).toBeTruthy();
});

test('test2: right table shorter', () => {
  expect(areObjectsEqual(mergeTables(data2a, data2b), data2c)).toBeTruthy();
});

test('test3a: right table void', () => {
  expect(areObjectsEqual(mergeTables(data3, []), [])).toBeTruthy();
});

test('test3b: left table void', () => {
  expect(areObjectsEqual(mergeTables([], data3), [])).toBeTruthy();
});
