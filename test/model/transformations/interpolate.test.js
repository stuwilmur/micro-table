import {areObjectsEqual} from '../../../src/util/object';
import {interpolate} from '../../../src/model/transformations/index';

// Test data

const dataframe = [
  {id1: 0, id2: 0, x: 0, y: 0.0, z: -1.0},
  {id1: 0, id2: 0, x: 1, y: NaN, z: null},
  {id1: 1, id2: 0, x: 2, y: 1.0, z: 0.0},
  {id1: 1, id2: 1, x: 3, y: null, z: NaN},
  {id1: 1, id2: 0, x: 4, y: 2.0, z: 1.0},
  {id1: 1, id2: 0, x: 4.5, y: NaN, z: NaN},
  {id1: 0, id2: 0, x: 5, y: 5, z: 4},
  {id1: 1, id2: 1, x: 6, y: 12, z: 10},
];

const interpY = [
  {id1: 0, id2: 0, x: 0, y: 0, z: -1},
  {id1: 0, id2: 0, x: 1, y: 0.5, z: null},
  {id1: 1, id2: 0, x: 2, y: 1, z: 0},
  {id1: 1, id2: 1, x: 3, y: 1.5, z: null},
  {id1: 1, id2: 0, x: 4, y: 2, z: 1},
  {id1: 1, id2: 0, x: 4.5, y: 3.5, z: null},
  {id1: 0, id2: 0, x: 5, y: 5, z: 4},
  {id1: 1, id2: 1, x: 6, y: 12, z: 10},
];

const interpYandZ = [
  {id1: 0, id2: 0, x: 0, y: 0, z: -1},
  {id1: 0, id2: 0, x: 1, y: 0.5, z: -0.5},
  {id1: 1, id2: 0, x: 2, y: 1, z: 0},
  {id1: 1, id2: 1, x: 3, y: 1.5, z: 0.5},
  {id1: 1, id2: 0, x: 4, y: 2, z: 1},
  {id1: 1, id2: 0, x: 4.5, y: 3.5, z: 2.5},
  {id1: 0, id2: 0, x: 5, y: 5, z: 4},
  {id1: 1, id2: 1, x: 6, y: 12, z: 10},
];

const interpYZgroup1 = [
  {id1: 0, id2: 0, x: 0, y: 0, z: -1},
  {id1: 0, id2: 0, x: 1, y: 1, z: 0},
  {id1: 0, id2: 0, x: 5, y: 5, z: 4},
  {id1: 1, id2: 0, x: 2, y: 1, z: 0},
  {id1: 1, id2: 1, x: 3, y: 1.5, z: 0.5},
  {id1: 1, id2: 0, x: 4, y: 2, z: 1},
  {id1: 1, id2: 0, x: 4.5, y: 4.5, z: 3.25},
  {id1: 1, id2: 1, x: 6, y: 12, z: 10},
];

const interpYZgroup2 = [
  {id1: 0, id2: 0, x: 0, y: 0, z: -1},
  {id1: 0, id2: 0, x: 1, y: 1, z: 0},
  {id1: 0, id2: 0, x: 5, y: 5, z: 4},
  {id1: 1, id2: 0, x: 2, y: 1, z: 0},
  {id1: 1, id2: 0, x: 4, y: 2, z: 1},
  {id1: 1, id2: 0, x: 4.5, y: 2.25, z: 1.25},
  {id1: 1, id2: 1, x: 3, y: 12, z: 10},
  {id1: 1, id2: 1, x: 6, y: 12, z: 10},
];

// Tests

test('interpolate one variable, no grouping', () => {
  expect(
    areObjectsEqual(interpolate(dataframe, 'x', ['y']), interpY),
  ).toBeTruthy();
});

test('interpolate two variables, no grouping', () => {
  expect(
    areObjectsEqual(interpolate(dataframe, 'x', ['y', 'z']), interpYandZ),
  ).toBeTruthy();
});

test('interpolate two variables, group by one', () => {
  expect(
    areObjectsEqual(
      interpolate(dataframe, 'x', ['y', 'z'], 'id1'),
      interpYZgroup1,
    ),
  ).toBeTruthy();
});

test('interpolate two variables, group by two', () => {
  expect(
    areObjectsEqual(
      interpolate(dataframe, 'x', ['y', 'z'], 'id1', 'id2'),
      interpYZgroup2,
    ),
  ).toBeTruthy();
});
