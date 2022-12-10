import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';

// Test data

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

const atheletesWithZeroColumn = [
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
    zero: 0,
  },
  {
    name: 'Lionel Messi',
    sport: 'Soccer',
    nation: 'Argentina',
    earnings: 111,
    zero: 0,
  },
  {
    name: 'Cristiano Ronaldo',
    sport: 'Soccer',
    nation: 'Portugal',
    earnings: 108,
    zero: 0,
  },
  {
    name: 'Conor McGregor',
    sport: 'MMA',
    nation: 'Ireland',
    earnings: 99,
    zero: 0,
  },
  {
    name: 'Neymar',
    sport: 'Soccer',
    nation: 'Brazil',
    earnings: 90,
    zero: 0,
  },
  {
    name: 'LeBron James',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 85.5,
    zero: 0,
  },
  {
    name: 'Roger Federer',
    sport: 'Tennis',
    nation: 'Switzerland',
    earnings: 77.2,
    zero: 0,
  },
  {
    name: 'Stephen Curry',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 76.9,
    zero: 0,
  },
  {
    name: 'Matt Ryan',
    sport: 'Football',
    nation: 'United States',
    earnings: 67.3,
    zero: 0,
  },
  {
    name: 'Matthew Stafford',
    sport: 'Football',
    nation: 'United States',
    earnings: 59.5,
    zero: 0,
  },
];

// Tests

test('Add a single constant column', () => {
  expect(
    areObjectsEqual(
      model().const().called('zero').value(0).end().data(athletes),
      atheletesWithZeroColumn,
    ),
  ).toBeTruthy();
});
