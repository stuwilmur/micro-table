import {groupBy} from '../../src/transformers/index';
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

const namesGroupedBySport = [
  'Floyd Mayweather',
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Neymar',
  'Conor McGregor',
  'LeBron James',
  'Stephen Curry',
  'Roger Federer',
  'Matt Ryan',
  'Matthew Stafford',
];

const namesGroupedByNationAndSport = [
  'Floyd Mayweather',
  'LeBron James',
  'Stephen Curry',
  'Matt Ryan',
  'Matthew Stafford',
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Conor McGregor',
  'Neymar',
  'Roger Federer',
];

// Tests

test('Test group by one property', () => {
  expect(
    areObjectsEqual(getNames(groupBy(athletes, 'sport')), namesGroupedBySport),
  ).toBeTruthy();
});

test('Test group by two properties', () => {
  expect(
    areObjectsEqual(
      getNames(groupBy(athletes, 'nation', 'sport')),
      namesGroupedByNationAndSport,
    ),
  ).toBeTruthy();
});

test('Test group by no properties', () => {
  expect(areObjectsEqual(groupBy(athletes), athletes)).toBeTruthy();
});
