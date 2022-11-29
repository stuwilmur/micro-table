import {selectVariables} from '../../../src/model/transformations/index';
import {areObjectsEqual} from '../../../src/util/utils';

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

test('checks that selecting vars id and b gives the expected result', () => {
  expect(
    areObjectsEqual(
      selectVariables(dataframe, 'id', 'b'),
      dataframeWithADeleted,
    ),
  ).toBeTruthy();
});

test('tests selecting all variables in a single operation', () => {
  expect(
    areObjectsEqual(selectVariables(dataframe, 'id', 'a', 'b'), dataframe),
  ).toBeTruthy();
});

test('tests selecting variable a', () => {
  expect(
    areObjectsEqual(selectVariables(dataframe, 'a'), dataframeAOnly),
  ).toBeTruthy();
});

test('tests selecting no variables', () => {
  expect(
    areObjectsEqual(selectVariables(dataframe), dataframeEmptyObjects),
  ).toBeTruthy();
});
