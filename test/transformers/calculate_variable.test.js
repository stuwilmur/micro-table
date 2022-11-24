// eslint-disable-next-line max-len
import {calculateVariable} from '../../src/model/transformers/index';
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

const dataframeBEqualsRunningTotalOfA = [
  {id: 0, a: 1, b: 1},
  {id: 1, a: 2, b: 3},
  {id: 2, a: 3, b: 6},
  {id: 3, a: 4, b: 10},
  {id: 4, a: 5, b: 15},
];

// Tests

test('checks calculating variable b as the square of variablee a', () => {
  expect(
    areObjectsEqual(
      calculateVariable(dataframe, 'b', (r) => {
        return r.a * r.a;
      }),
      dataframeBEqualsASquared,
    ),
  ).toBeTruthy();
});

test('checks calculating variable a as the square of variablee a', () => {
  expect(
    areObjectsEqual(
      calculateVariable(dataframe, 'a', (r) => {
        return r.a * r.a;
      }),
      dataframeAEqualsASquared,
    ),
  ).toBeTruthy();
});

test('checks calculating variable b as previous value of a', () => {
  expect(
    areObjectsEqual(
      calculateVariable(dataframe, 'b', (r, getPrev) => {
        const prev = getPrev(1);
        return prev === undefined ? undefined : prev.a;
      }),
      dataframeBEqualsPreviousA,
    ),
  ).toBeTruthy();
});

test('checks calculating variable b as running total of a', () => {
  expect(
    areObjectsEqual(
      calculateVariable(dataframe, 'b', (r, getPrev) => {
        const prev = getPrev(1);
        const prevB = prev === undefined ? 0 : prev.b;
        return r.a + prevB;
      }),
      dataframeBEqualsRunningTotalOfA,
    ),
  ).toBeTruthy();
});
