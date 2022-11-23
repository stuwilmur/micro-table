import {stableSort} from '../../src/transformers/index';
import {map, areObjectsEqual, prop} from '../../src/util/utils';

const getNames = map(prop('name'));

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

const namesSortedByEarnings = [
  'Matthew Stafford',
  'Matt Ryan',
  'Stephen Curry',
  'Roger Federer',
  'LeBron James',
  'Neymar',
  'Conor McGregor',
  'Cristiano Ronaldo',
  'Lionel Messi',
  'Floyd Mayweather',
];

const namesSortedByNationAndEarnings = [
  'Lionel Messi',
  'Neymar',
  'Conor McGregor',
  'Cristiano Ronaldo',
  'Roger Federer',
  'Matthew Stafford',
  'Matt Ryan',
  'Stephen Curry',
  'LeBron James',
  'Floyd Mayweather',
];

const namesSortedByNationSportAndEarnings = [
  'Lionel Messi',
  'Neymar',
  'Conor McGregor',
  'Cristiano Ronaldo',
  'Roger Federer',
  'Stephen Curry',
  'LeBron James',
  'Floyd Mayweather',
  'Matthew Stafford',
  'Matt Ryan',
];

// Tests

test('Test sort on one property', () => {
  expect(
    areObjectsEqual(
      getNames(stableSort(athletes, 'earnings')),
      namesSortedByEarnings,
    ),
  ).toBeTruthy();
});

test('Test sort on two properties', () => {
  expect(
    areObjectsEqual(
      getNames(stableSort(athletes, 'nation', 'earnings')),
      namesSortedByNationAndEarnings,
    ),
  ).toBeTruthy();
});

test('Test sort on three properties', () => {
  expect(
    areObjectsEqual(
      getNames(stableSort(athletes, 'nation', 'sport', 'earnings')),
      namesSortedByNationSportAndEarnings,
    ),
  ).toBeTruthy();
});

test('Test sort on nothing', () => {
  expect(areObjectsEqual(stableSort(athletes), athletes)).toBeTruthy();
});

test('Test sorting keys are order-independent', () => {
  expect(
    areObjectsEqual(
      stableSort(athletes, 'sport', 'nation'),
      stableSort(athletes, 'nation', 'sport'),
    ),
  ).toBeTruthy();
});
