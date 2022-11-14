import {calculateColumn} from '../../src/dataframe functions/calculate_column';
import {areObjectsEqual} from '../../src/util/utils';

// Test data

const dataframe = [
  {id: 0, a: 1, b: 2},
  {id: 1, a: 2, b: 4},
  {id: 2, a: 3, b: 6},
  {id: 3, a: 4, b: 8},
  {id: 4, a: 5, b: 10},
];

const dataframeBEqualsASquared = [
  {id: 0, a: 1, b: 1},
  {id: 1, a: 2, b: 4},
  {id: 2, a: 3, b: 9},
  {id: 3, a: 4, b: 16},
  {id: 4, a: 5, b: 25},
];

const dataframeAEqualsASquared = [
  {id: 0, a: 1, b: 2},
  {id: 1, a: 4, b: 4},
  {id: 2, a: 9, b: 6},
  {id: 3, a: 16, b: 8},
  {id: 4, a: 25, b: 10},
];

const dataframeBEqualsPreviousA = [
  {id: 0, a: 1, b: undefined},
  {id: 1, a: 2, b: 1},
  {id: 2, a: 3, b: 2},
  {id: 3, a: 4, b: 3},
  {id: 4, a: 5, b: 4},
];

// Tests

test('checks calculating column b as the square of columne a', () => {
  expect(
    areObjectsEqual(
      calculateColumn(dataframe, 'b', (r) => {
        return r.a * r.a;
      }),
      dataframeBEqualsASquared,
    ),
  ).toBeTruthy();
});

test('checks calculating column a as the square of columne a', () => {
  expect(
    areObjectsEqual(
      calculateColumn(dataframe, 'a', (r) => {
        return r.a * r.a;
      }),
      dataframeAEqualsASquared,
    ),
  ).toBeTruthy();
});

test('checks calculating column b as previous value of a', () => {
  expect(
    areObjectsEqual(
      calculateColumn(dataframe, 'b', (r, getPrev) => {
        const prev = getPrev(1);
        return prev === undefined ? undefined : prev.a;
      }),
      dataframeBEqualsPreviousA,
    ),
  ).toBeTruthy();
});
