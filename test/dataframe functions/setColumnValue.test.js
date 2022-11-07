import {setColumnValue} from '../../src/dataframe functions/set_column_value';
import {areObjectsEqual} from '../../src/util/utils';

// Test data

const dataframe = [
  {id: 0, a: 1, b: 2},
  {id: 1, a: 2, b: 4},
  {id: 2, a: 3, b: 6},
  {id: 3, a: 4, b: 8},
  {id: 4, a: 5, b: 10},
];

const dataframeWithXEqualZero = [
  {id: 0, a: 1, b: 2, x: 0},
  {id: 1, a: 2, b: 4, x: 0},
  {id: 2, a: 3, b: 6, x: 0},
  {id: 3, a: 4, b: 8, x: 0},
  {id: 4, a: 5, b: 10, x: 0},
];

// Tests

test('checks that adding a column x with value 0 gives expected result', () => {
  expect(
    areObjectsEqual(setColumnValue(dataframe, 'x', 0), dataframeWithXEqualZero),
  ).toBeTruthy();
});

test('checks that adding column with the same value has no effect', () => {
  expect(
    areObjectsEqual(
      setColumnValue(setColumnValue(dataframe, 'x', 0), 'x', 0),
      dataframeWithXEqualZero,
    ),
  ).toBeTruthy();
});
