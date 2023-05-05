import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data

const forenames = [
  {id: 0, forename: 'Alice'},
  {id: 1, forename: 'Alice'},
  {id: 2, forename: 'Bob'},
];

const surnames = [
  {id: 2, surname: 'Singh'},
  {id: 0, surname: 'Zonn'},
  {id: 1, surname: 'Jones'},
];

const combined = [
  {id: 0, forename: 'Alice', surname: 'Zonn'},
  {id: 1, forename: 'Alice', surname: 'Jones'},
  {id: 2, forename: 'Bob', surname: 'Singh'},
];

test('test1: knit two tables', () => {
  expect(
    areObjectsEqual(
      model().knit().with(surnames).match('id').end().data(forenames),
      combined,
    ),
  ).toBeTruthy();
});
