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
  {year: 2000, money: 100, person: 'alice'},
  {year: 2001, money: 101, person: 'alice'},
  {year: 2000, money: 200, person: 'bob'},
  {year: 2001, money: 202, person: 'bob'},
  {year: 2000, money: 300, person: 'charlie'},
  {year: 2001, money: 303, person: 'charlie'},
];

const collapse2 = [
  {year: 2000, charlie: 300, money: 100, person: 'alice'},
  {year: 2001, charlie: 303, money: 101, person: 'alice'},
  {year: 2000, charlie: 300, money: 200, person: 'bob'},
  {year: 2001, charlie: 303, money: 202, person: 'bob'},
];

const collapse1 = [
  {year: 2000, bob: 200, charlie: 300, money: 100, person: 'alice'},
  {year: 2001, bob: 202, charlie: 303, money: 101, person: 'alice'},
];

// Tests

test('Test collapse 0', () => {
  expect(
    areObjectsEqual(
      model().tidy().to('person').quantity('money').end().data(data),
      data,
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
