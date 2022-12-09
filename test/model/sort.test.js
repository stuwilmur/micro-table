import model from '../../src/model/model';
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

const athletesSortedByNationAndEarnings = [
  {
    name: 'Matthew Stafford',
    sport: 'Football',
    nation: 'United States',
    earnings: 59.5,
  },
  {
    name: 'Matt Ryan',
    sport: 'Football',
    nation: 'United States',
    earnings: 67.3,
  },
  {
    name: 'Stephen Curry',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 76.9,
  },
  {
    name: 'LeBron James',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 85.5,
  },
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
  },
  {
    name: 'Roger Federer',
    sport: 'Tennis',
    nation: 'Switzerland',
    earnings: 77.2,
  },
  {
    name: 'Cristiano Ronaldo',
    sport: 'Soccer',
    nation: 'Portugal',
    earnings: 108,
  },
  {
    name: 'Conor McGregor',
    sport: 'MMA',
    nation: 'Ireland',
    earnings: 99,
  },
  {name: 'Neymar', sport: 'Soccer', nation: 'Brazil', earnings: 90},
  {
    name: 'Lionel Messi',
    sport: 'Soccer',
    nation: 'Argentina',
    earnings: 111,
  },
];

const athletesSortedByEarnings = [
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

// Tests

test('Test sort by one key', () => {
  expect(
    areObjectsEqual(
      model()
        .sort()
        .inc('earnings')
        .end()
        .data(athletes)
        .map((x) => x.name),
      athletesSortedByEarnings,
    ),
  ).toBeTruthy();
});

test('Test sort by two keys, different directions', () => {
  expect(
    areObjectsEqual(
      model().sort().dec('nation').inc('earnings').end().data(athletes),
      athletesSortedByNationAndEarnings,
    ),
  ).toBeTruthy();
});
