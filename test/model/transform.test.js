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

const athletesSortedByEarnings = [
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
    name: 'Roger Federer',
    sport: 'Tennis',
    nation: 'Switzerland',
    earnings: 77.2,
  },
  {
    name: 'LeBron James',
    sport: 'Basketball',
    nation: 'United States',
    earnings: 85.5,
  },
  {name: 'Neymar', sport: 'Soccer', nation: 'Brazil', earnings: 90},
  {
    name: 'Conor McGregor',
    sport: 'MMA',
    nation: 'Ireland',
    earnings: 99,
  },
  {
    name: 'Cristiano Ronaldo',
    sport: 'Soccer',
    nation: 'Portugal',
    earnings: 108,
  },
  {
    name: 'Lionel Messi',
    sport: 'Soccer',
    nation: 'Argentina',
    earnings: 111,
  },
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
  },
];

const athletesHighEarnings = [
  {
    name: 'Floyd Mayweather',
    sport: 'Boxing',
    nation: 'United States',
    earnings: 285,
  },
];

// Tests

test('Test adding a sort transformation', () => {
  expect(
    areObjectsEqual(
      model()
        .transform((x) => x.sort((a, b) => a.earnings - b.earnings))
        .data(athletes),
      athletesSortedByEarnings,
    ),
  ).toBeTruthy();
});

test('Test adding a filter transformation', () => {
  expect(
    areObjectsEqual(
      model()
        .transform((x) => x.filter((r) => r.earnings > 280))
        .data(athletes),
      athletesHighEarnings,
    ),
  ).toBeTruthy();
});
