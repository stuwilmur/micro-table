import {
  areObjectsEqual,
  clone,
  purge,
  pick,
  compareBy,
} from '../../src/util/utils.js';

// Test data

const simpleObject = {a: 1, b: 'two'};
const simpleObjectDoppelganger = {a: 1, b: 'two'};
const simpleObjectAOnly = {a: 1};
const simpleObjectBOnly = {b: 'two'};
const listToSort = [
  {a: 1, b: 3},
  {a: 0, b: 2},
  {a: 3, b: 1},
  {a: 2, b: 0},
];
const listSortedOnA = [
  {a: 0, b: 2},
  {a: 1, b: 3},
  {a: 2, b: 0},
  {a: 3, b: 1},
];
const listSortedOnB = [
  {a: 2, b: 0},
  {a: 3, b: 1},
  {a: 0, b: 2},
  {a: 1, b: 3},
];
const athletes = [
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
  },
  {name: 'Lionel Messi', sport: 'Soccer', nation: 'Argentina', earnings: 111},
  {
    name: 'Cristiano Ronaldo',
    sport: 'Soccer',
    nation: 'Portugal',
    earnings: 108,
  },
  {name: 'Conor McGregor', sport: 'MMA', nation: 'Ireland', earnings: 99},
  {name: 'Neymar', sport: 'Soccer', nation: 'Brazil', earnings: 90},
  {
    name: 'LeBron James',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 85.5,
  },
  {
    name: 'Roger Federer',
    sport: 'Tennis',
    nation: 'Switzerland',
    earnings: 77.2,
  },
  {
    name: 'Stephen Curry',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 76.9,
  },
  {
    name: 'Matt Ryan',
    sport: 'Football',
    nation: 'United States',
    earnings: 67.3,
  },
  {
    name: 'Matthew Stafford',
    sport: 'Football',
    nation: 'United States',
    earnings: 59.5,
  },
];

// Tests

/*
areObjectsEqual
 */
test('checks that identical numbers are recognised as equal', () => {
  expect(areObjectsEqual(1, 1)).toBeTruthy();
});

test('checks that identical objects are recognised as equal', () => {
  expect(areObjectsEqual(simpleObject, simpleObject)).toBeTruthy();
});

test('checks that similar numbers are recognised as equal', () => {
  expect(areObjectsEqual(simpleObject, simpleObjectDoppelganger)).toBeTruthy();
});

/*
clone
 */
test('checks clone 1 returns expected value', () => {
  expect(clone(1)).toBe(1);
});

test('checks clone simple object returns expected value', () => {
  expect(areObjectsEqual(simpleObject, clone(simpleObject))).toBeTruthy();
});

/*
purge
 */
test('checks purge simple object returns expected value', () => {
  expect(areObjectsEqual(simpleObject, purge(simpleObject))).toBeTruthy();
});

test('checks purge simple object returns expected value', () => {
  expect(
    areObjectsEqual(simpleObjectBOnly, purge(simpleObject, 'a')),
  ).toBeTruthy();
});

test('checks purge simple object returns expected value', () => {
  expect(
    areObjectsEqual(simpleObjectAOnly, purge(simpleObject, 'b')),
  ).toBeTruthy();
});

test('checks purge simple object returns expected value', () => {
  expect(areObjectsEqual({}, purge(simpleObject, 'a', 'b'))).toBeTruthy();
});

/*
pick
 */
test('checks pick simple object returns expected value', () => {
  expect(areObjectsEqual({}, pick(simpleObject))).toBeTruthy();
});

test('checks pick simple object returns expected value', () => {
  expect(
    areObjectsEqual(simpleObjectAOnly, pick(simpleObject, 'a')),
  ).toBeTruthy();
});

test('checks pick simple object returns expected value', () => {
  expect(
    areObjectsEqual(simpleObjectBOnly, pick(simpleObject, 'b')),
  ).toBeTruthy();
});

test('checks pick simple object returns expected value', () => {
  expect(
    areObjectsEqual(simpleObject, pick(simpleObject, 'a', 'b')),
  ).toBeTruthy();
});

/*
compareBy
 */
test('checks sorting a list on property "a" using compareBy', () => {
  expect(
    areObjectsEqual(listSortedOnA, listToSort.sort(compareBy('a'))),
  ).toBeTruthy();
});

test('checks sorting a list on property "b" using compareBy', () => {
  expect(
    areObjectsEqual(listSortedOnB, listToSort.sort(compareBy('b'))),
  ).toBeTruthy();
});
