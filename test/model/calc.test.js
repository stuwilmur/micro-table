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

const athletesWithEarningsInHundreds = [
  {
    'name': 'Floyd Mayweather',
    'sport': 'Boxing',
    'nation': 'United States',
    'earnings': 285,
    'earnings hundreds': 2.85,
  },
  {
    'name': 'Lionel Messi',
    'sport': 'Soccer',
    'nation': 'Argentina',
    'earnings': 111,
    'earnings hundreds': 1.11,
  },
  {
    'name': 'Cristiano Ronaldo',
    'sport': 'Soccer',
    'nation': 'Portugal',
    'earnings': 108,
    'earnings hundreds': 1.08,
  },
  {
    'name': 'Conor McGregor',
    'sport': 'MMA',
    'nation': 'Ireland',
    'earnings': 99,
    'earnings hundreds': 0.99,
  },
  {
    'name': 'Neymar',
    'sport': 'Soccer',
    'nation': 'Brazil',
    'earnings': 90,
    'earnings hundreds': 0.9,
  },
  {
    'name': 'LeBron James',
    'sport': 'Basketball',
    'nation': 'United States',
    'earnings': 85.5,
    'earnings hundreds': 0.855,
  },
  {
    'name': 'Roger Federer',
    'sport': 'Tennis',
    'nation': 'Switzerland',
    'earnings': 77.2,
    'earnings hundreds': 0.772,
  },
  {
    'name': 'Stephen Curry',
    'sport': 'Basketball',
    'nation': 'United States',
    'earnings': 76.9,
    'earnings hundreds': 0.769,
  },
  {
    'name': 'Matt Ryan',
    'sport': 'Football',
    'nation': 'United States',
    'earnings': 67.3,
    'earnings hundreds': 0.6729999999999999,
  },
  {
    'name': 'Matthew Stafford',
    'sport': 'Football',
    'nation': 'United States',
    'earnings': 59.5,
    'earnings hundreds': 0.595,
  },
];

// Tests

test('Calculate one column', () => {
  expect(
    areObjectsEqual(
      model()
        .calc()
        .called('earnings hundreds')
        .does((r) => r.earnings / 100)
        .end()
        .data(athletes),
      athletesWithEarningsInHundreds,
    ),
  ).toBeTruthy();
});
