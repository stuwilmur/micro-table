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

const athletesFilteredEarnings = [
  'Floyd Mayweather',
  'Lionel Messi',
  'Cristiano Ronaldo',
];

const athletesFilteredNation = [
  'Floyd Mayweather',
  'LeBron James',
  'Stephen Curry',
  'Matt Ryan',
  'Matthew Stafford',
];

// Tests

test('Test filter by earnings', () => {
  expect(
    areObjectsEqual(
      model()
        .filter((x) => x.earnings > 100)
        .data(athletes)
        .map((x) => x.name),
      athletesFilteredEarnings,
    ),
  ).toBeTruthy();
});

test('Test filter by nation', () => {
  expect(
    areObjectsEqual(
      model()
        .filter((x) => x.nation == 'United States')
        .data(athletes)
        .map((x) => x.name),
      athletesFilteredNation,
    ),
  ).toBeTruthy();
});
