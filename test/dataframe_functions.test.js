import {calculateColumn} from '../src/dataframe functions/calculate_column';
import {deleteColumn} from '../src/dataframe functions/delete_column';
import {setColumnValue} from '../src/dataframe functions/set_column_value';
import {areObjectsEqual} from '../src/util/utils';

// Test data

const dataframe = [
  {id: 0, a: 1, b: 2},
  {id: 1, a: 2, b: 4},
  {id: 2, a: 3, b: 6},
  {id: 3, a: 4, b: 8},
  {id: 4, a: 5, b: 10},
];

/*
setColumnValue
 */
const dataframeWithXEqualZero = [
  {id: 0, a: 1, b: 2, x: 0},
  {id: 1, a: 2, b: 4, x: 0},
  {id: 2, a: 3, b: 6, x: 0},
  {id: 3, a: 4, b: 8, x: 0},
  {id: 4, a: 5, b: 10, x: 0},
];

/*
deleteColumn
 */
const dataframeWithADeleted = [
  {id: 0, b: 2},
  {id: 1, b: 4},
  {id: 2, b: 6},
  {id: 3, b: 8},
  {id: 4, b: 10},
];

const dataframeEmptyObjects = [{}, {}, {}, {}, {}];

/*
calculateColumn
 */
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

/*
setColumnValue
 */
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

/*
deleteColumn
 */
test('checks that deleting column a gives the expected result', () => {
  expect(
    areObjectsEqual(deleteColumn(dataframe, 'a'), dataframeWithADeleted),
  ).toBeTruthy();
});

test('checks that deleting all columns give the expected result', () => {
  expect(
    areObjectsEqual(
      deleteColumn(deleteColumn(deleteColumn(dataframe, 'a'), 'b'), 'id'),
      dataframeEmptyObjects,
    ),
  ).toBeTruthy();
});

/*
calculateColumn
 */
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
