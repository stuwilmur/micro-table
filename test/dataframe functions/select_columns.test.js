import {selectColumns} from '../../src/dataframe functions/select_columns';
import {areObjectsEqual} from '../../src/util/utils';

// Test data

const dataframe = [
  {id: 0, a: 1, b: 2},
  {id: 1, a: 2, b: 4},
  {id: 2, a: 3, b: 6},
  {id: 3, a: 4, b: 8},
  {id: 4, a: 5, b: 10},
];

const dataframeWithADeleted = [
  {id: 0, b: 2},
  {id: 1, b: 4},
  {id: 2, b: 6},
  {id: 3, b: 8},
  {id: 4, b: 10},
];

const dataframeEmptyObjects = [{}, {}, {}, {}, {}];

const dataframeAOnly = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}];

// Tests

test('checks that selecting columns id and b gives the expected result', () => {
  expect(
    areObjectsEqual(selectColumns(dataframe, 'id', 'b'), dataframeWithADeleted),
  ).toBeTruthy();
});

test('tests selecting all columns in a single operation', () => {
  expect(
    areObjectsEqual(selectColumns(dataframe, 'id', 'a', 'b'), dataframe),
  ).toBeTruthy();
});

test('tests selecting column a', () => {
  expect(
    areObjectsEqual(selectColumns(dataframe, 'a'), dataframeAOnly),
  ).toBeTruthy();
});

test('tests selecting no columns', () => {
  expect(
    areObjectsEqual(selectColumns(dataframe), dataframeEmptyObjects),
  ).toBeTruthy();
});
