import {deleteColumns} from '../../src/dataframe functions/delete_columns';
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

// Tests

test('checks that deleting column a gives the expected result', () => {
  expect(
    areObjectsEqual(deleteColumns(dataframe, 'a'), dataframeWithADeleted),
  ).toBeTruthy();
});

test('tests deleting all columns sequentially', () => {
  expect(
    areObjectsEqual(
      deleteColumns(deleteColumns(deleteColumns(dataframe, 'a'), 'b'), 'id'),
      dataframeEmptyObjects,
    ),
  ).toBeTruthy();
});

test('tests deleting all columns in a single operation', () => {
  expect(
    areObjectsEqual(
      deleteColumns(dataframe, 'a', 'b', 'id'),
      dataframeEmptyObjects,
    ),
  ).toBeTruthy();
});
