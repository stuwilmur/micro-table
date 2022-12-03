import {model} from '../../src/model/model';
import {areObjectsEqual} from '../../src/util';
import {sum} from 'd3';

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

const athletesByNation = [
  {
    'nation': 'United States',
    'total earnings': 574.1999999999999,
    'average earnings': 114.83999999999999,
  },
  {
    'nation': 'Argentina',
    'total earnings': 111,
    'average earnings': 111,
  },
  {
    'nation': 'Portugal',
    'total earnings': 108,
    'average earnings': 108,
  },
  {'nation': 'Ireland', 'total earnings': 99, 'average earnings': 99},
  {'nation': 'Brazil', 'total earnings': 90, 'average earnings': 90},
  {
    'nation': 'Switzerland',
    'total earnings': 77.2,
    'average earnings': 77.2,
  },
];

const athletesByNationAndSport = [
  {
    'nation': 'United States',
    'sport': 'Boxing',
    'total earnings': 285,
    'average earnings': 285,
  },
  {
    'nation': 'United States',
    'sport': 'Basketball',
    'total earnings': 162.4,
    'average earnings': 81.2,
  },
  {
    'nation': 'United States',
    'sport': 'Football',
    'total earnings': 126.8,
    'average earnings': 63.4,
  },
  {
    'nation': 'Argentina',
    'sport': 'Soccer',
    'total earnings': 111,
    'average earnings': 111,
  },
  {
    'nation': 'Portugal',
    'sport': 'Soccer',
    'total earnings': 108,
    'average earnings': 108,
  },
  {
    'nation': 'Ireland',
    'sport': 'MMA',
    'total earnings': 99,
    'average earnings': 99,
  },
  {
    'nation': 'Brazil',
    'sport': 'Soccer',
    'total earnings': 90,
    'average earnings': 90,
  },
  {
    'nation': 'Switzerland',
    'sport': 'Tennis',
    'total earnings': 77.2,
    'average earnings': 77.2,
  },
];

// Tests

test('Test reduce, group by one key', () => {
  expect(
    areObjectsEqual(
      model()
        .reduce()
        .add()
        .called('total earnings')
        .does((x) => sum(x, (d) => d.earnings))
        .end()
        .add()
        .called('average earnings')
        .does((x) => sum(x, (d) => d.earnings) / x.length)
        .end()
        .groupBy('nation')
        .end()
        .data(athletes),
      athletesByNation,
    ),
  ).toBeTruthy();
});

test('Test reduce, group by two keys', () => {
  expect(
    areObjectsEqual(
      model()
        .reduce()
        .add()
        .called('total earnings')
        .does((x) => sum(x, (d) => d.earnings))
        .end()
        .add()
        .called('average earnings')
        .does((x) => sum(x, (d) => d.earnings) / x.length)
        .end()
        .groupBy('nation', 'sport')
        .end()
        .data(athletes),
      athletesByNationAndSport,
    ),
  ).toBeTruthy();
});
