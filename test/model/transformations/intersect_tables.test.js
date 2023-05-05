import {intersectTables} from '../../../src/model/transformations';
import {areObjectsEqual} from '../../../src/util';

// Test data

const left3 = [
  {id: 0, a: 0},
  {id: 1, a: 1},
  {id: 2, a: 2},
];

const right3 = [
  {id: 0, b: 0},
  {id: 1, b: 1},
  {id: 2, b: 2},
];

const left2 = [
  {id: 0, a: 0},
  {id: 1, a: 1},
];

const right2 = [
  {id: 1, b: 1},
  {id: 2, b: 2},
];

const left4 = [
  {id: 1, a: 3},
  {id: 2, a: 4},
  {id: 1, a: 1},
  {id: 2, a: 2},
];

const right4 = [
  {id: 1, b: 3},
  {id: 2, b: 4},
  {id: 1, b: 1},
  {id: 2, b: 2},
];

const left4ab = [
  {id: 0, a: 0, b: 1},
  {id: 1, a: 4, b: 5},
  {id: 1, a: 8, b: 9},
  {id: 2, a: 12, b: 13},
];

const right4ab = [
  {id: 0, a: 2, b: 3},
  {id: 1, a: 6, b: 7},
  {id: 1, a: 10, b: 11},
  {id: 2, a: 14, b: 15},
];

const left3AndRight3 = [
  {id: 0, a: 0, b: 0},
  {id: 1, a: 1, b: 1},
  {id: 2, a: 2, b: 2},
];

const left2AndRight3 = [
  {id: 0, a: 0, b: 0},
  {id: 1, a: 1, b: 1},
];

const left3AndRight2 = [
  {id: 1, a: 1, b: 1},
  {id: 2, a: 2, b: 2},
];

const left4AndRight3 = [
  {id: 1, a: 3, b: 1},
  {id: 2, a: 4, b: 2},
  {id: 1, a: 1, b: 1},
  {id: 2, a: 2, b: 2},
];

const left3AndRight4 = [
  {id: 1, a: 1, b: 3},
  {id: 2, a: 2, b: 4},
];

const left4abAndRight4ab = [
  {id: 0, a: 2, b: 3},
  {id: 1, a: 6, b: 7},
  {id: 1, a: 6, b: 7},
  {id: 2, a: 14, b: 15},
];

const left3AndRight4ab = [
  {id: 0, a: 2, b: 3},
  {id: 1, a: 6, b: 7},
  {id: 2, a: 14, b: 15},
];

const left4abAndRight3 = [
  {id: 0, a: 0, b: 0},
  {id: 1, a: 4, b: 1},
  {id: 1, a: 8, b: 1},
  {id: 2, a: 12, b: 2},
];

// Tests

test('[], []', () => {
  expect(areObjectsEqual(intersectTables([], [], 'id'), [])).toBeTruthy();
});

test('left3, []', () => {
  expect(areObjectsEqual(intersectTables(left3, [], 'id'), [])).toBeTruthy();
});

test('left3, right3', () => {
  expect(
    areObjectsEqual(intersectTables(left3, right3, 'id'), left3AndRight3),
  ).toBeTruthy();
});

test('[], right3', () => {
  expect(areObjectsEqual(intersectTables([], right3, 'id'), [])).toBeTruthy();
});

test('left2, right3', () => {
  expect(
    areObjectsEqual(intersectTables(left2, right3, 'id'), left2AndRight3),
  ).toBeTruthy();
});

test('left3, right2', () => {
  expect(
    areObjectsEqual(intersectTables(left3, right2, 'id'), left3AndRight2),
  ).toBeTruthy();
});

test('left4, right3', () => {
  expect(
    areObjectsEqual(intersectTables(left4, right3, 'id'), left4AndRight3),
  ).toBeTruthy();
});

test('left3, right4', () => {
  expect(
    areObjectsEqual(intersectTables(left3, right4, 'id'), left3AndRight4),
  ).toBeTruthy();
});

test('left4ab, right4ab', () => {
  expect(
    areObjectsEqual(
      intersectTables(left4ab, right4ab, 'id'),
      left4abAndRight4ab,
    ),
  ).toBeTruthy();
});

test('left3, right4ab', () => {
  expect(
    areObjectsEqual(intersectTables(left3, right4ab, 'id'), left3AndRight4ab),
  ).toBeTruthy();
});

test('left4ab, right3', () => {
  expect(
    areObjectsEqual(intersectTables(left4ab, right3, 'id'), left4abAndRight3),
  ).toBeTruthy();
});
