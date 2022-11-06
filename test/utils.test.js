import {areObjectsEqual, clone, purge, pick} from '../src/util/utils.js';

const simpleObject = {a: 1, b: 'two'};
const simpleObjectDoppelganger = {a: 1, b: 'two'};
const simpleObjectAOnly = {a: 1};
const simpleObjectBOnly = {b: 'two'};

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
