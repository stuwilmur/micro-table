import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data

const data = [
  {
    year: 2000,
    alice: 100,
    bob: 200,
    charlie: 300,
  },
  {
    year: 2001,
    alice: 101,
    bob: 202,
    charlie: 303,
  },
];

const collapse3 = [
  {year: 2000, person: 'alice', money: 100},
  {year: 2001, person: 'alice', money: 101},
  {year: 2000, person: 'bob', money: 200},
  {year: 2001, person: 'bob', money: 202},
  {year: 2000, person: 'charlie', money: 300},
  {year: 2001, person: 'charlie', money: 303},
];

const collapse2 = [
  {year: 2000, charlie: 300, person: 'alice', money: 100},
  {year: 2001, charlie: 303, person: 'alice', money: 101},
  {year: 2000, charlie: 300, person: 'bob', money: 200},
  {year: 2001, charlie: 303, person: 'bob', money: 202},
];

const collapse1 = [
  {year: 2000, bob: 200, charlie: 300, person: 'alice', money: 100},
  {year: 2001, bob: 202, charlie: 303, person: 'alice', money: 101},
];

// Tests

test('Test collapse 0', () => {
  expect(
    areObjectsEqual(
      model().tidy().to('person').quantity('money').end().data(data).length,
      0,
    ),
  ).toBeTruthy();
});

test('Test collapse 1', () => {
  expect(
    areObjectsEqual(
      model()
        .tidy()
        .collapse('alice')
        .to('person')
        .quantity('money')
        .end()
        .data(data),
      collapse1,
    ),
  ).toBeTruthy();
});

test('Test collapse 2', () => {
  expect(
    areObjectsEqual(
      model()
        .tidy()
        .collapse('alice')
        .collapse('bob')
        .to('person')
        .quantity('money')
        .end()
        .data(data),
      collapse2,
    ),
  ).toBeTruthy();
});

test('Test collapse 3', () => {
  expect(
    areObjectsEqual(
      model()
        .tidy()
        .collapse('alice')
        .collapse('bob')
        .collapse('charlie')
        .to('person')
        .quantity('money')
        .end()
        .data(data),
      collapse3,
    ),
  ).toBeTruthy();
});
