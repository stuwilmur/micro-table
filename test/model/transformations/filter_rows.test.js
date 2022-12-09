import {filterRows} from '../../../src/model/transformations';
import {areObjectsEqual} from '../../../src/util';

// Test data
const data = [
  {n: 1, a: 2, b: 2, c: 2},
  {n: 2, a: 3, b: 2, c: 2},
  {n: 3, a: 1, b: 2, c: 2},
  {n: 4, a: 2, b: 3, c: 3},
  {n: 5, a: 3, b: 3, c: 3},
  {n: 6, a: 1, b: 3, c: 3},
  {n: 7, a: 2, b: 1, c: 1},
  {n: 8, a: 3, b: 1, c: 1},
  {n: 9, a: 1, b: 1, c: 1},
];

const dataAEquals3 = [
  {n: 2, a: 3, b: 2, c: 2},
  {n: 5, a: 3, b: 3, c: 3},
  {n: 8, a: 3, b: 1, c: 1},
];

// Tests

test('tests filtering on a == 3', () => {
  expect(
    areObjectsEqual(
      filterRows(data, (d) => d.a == 3),
      dataAEquals3,
    ),
  ).toBeTruthy();
});
